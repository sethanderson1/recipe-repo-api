const path = require('path')
const express = require('express')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

// todo: add delete method

usersRouter
    .route('/')
    .get(async (req, res, next) => {
        try {
            const knexInstance = req.app.get('db')
            const users = await UsersService.getAllUsers(knexInstance)
            res.json(users.map(UsersService.serializeUser))
        } catch (err) {
            next()
        }
    })
    .post(jsonParser, async (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { user_name, password } = req.body

        for (const [key, value] of Object.entries([user_name, password])) {
            if (value === null) {
                return res.status(404).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        // confirm name not already taken
        UsersService.hasUserWithUserName(
            knexInstance,
            user_name
        )
            .then(hasName => {
                if (hasName) {
                    return res.status(400).json({
                        error: { message: `Username already taken` }
                    })
                }
            })


        // validate password
        if (UsersService.validatePassword(password)) {
            return res.status(400).json({
                error: {message: UsersService.validatePassword(password)} 
            })
        }

        // hash password and insert user in database
        try {
            const hashedPassword = await UsersService.hashPassword(password)
            const newUser = {
                user_name,
                password: hashedPassword,
                date_created: 'now()'
            }
            const user = await UsersService.insertUser(knexInstance, newUser)
            res.status(201)
                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(UsersService.serializeUser(user))
        } catch (err) {
            console.log('err', err)
            next()
        }
    })

module.exports = usersRouter
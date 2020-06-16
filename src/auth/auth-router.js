const path = require('path')
const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const jsonParser = express.json()

authRouter
    .route('/login')
    .post(jsonParser, async (req, res, next) => {
        const { user_name, password } = req.body
        const loginUser = { user_name, password }
        const knexInstance = req.app.get('db')

        for (const field of ['user_name', 'password']) {
            if (!req.body[field]) {
                return res.status(400).json({
                    error: { message: `Missing '${field}' in request body` }
                })
            }
        }

        try {
            const dbUser = await AuthService
                .getUserWithUsername(
                    knexInstance,
                    loginUser.user_name
                )

                if(!dbUser) {
                    return res.status(400)
                    .json({
                        error: {message: `Incorrect username or password`}
                    })
                }
            const passwordsMatch = await AuthService
            .comparePasswords(
                loginUser.password,
                dbUser.password
                )
            if (!passwordsMatch) {
                return res.status(400)
                    .json({
                        error: {message: `Incorrect username or password`}
                    })
            }
            
            const sub = dbUser.user_name
            const payload = { user_id: dbUser.id }

            res.send({
                // user_name: dbUser.user_name,
                authToken: AuthService.createJwt(sub, payload)
            })

        } catch (err) {
            console.log('err', err)
            next()
        }
    })

module.exports = authRouter
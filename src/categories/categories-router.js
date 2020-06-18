const path = require('path')
const express = require('express')
const xss = require('xss')
const CategoriesService = require('./categories-service')
const { requireAuth } = require('../middleware/jwt-auth')
const categoriesRouter = express.Router()
const jsonParser = express.json()

const serializeCategory = category => {
    return {
        id: category.id,
        category_name: xss(category.category_name),
    }
}
categoriesRouter
    .route('/')
    .all(requireAuth)
    .get(async (req, res, next) => {
        // console.log('req.user', req.user)
        const { id } = req.user
        const db = req.app.get('db')
        try {
            const categories = await CategoriesService
                .getAllCategories(db, id)
            const ownedCategories = categories
                .filter(category => category.author_id === id)
            res.json(ownedCategories.map(serializeCategory))
        } catch (err) {
            next()
        }
    })
    .post(jsonParser, (req, res, next) => {
        const { id } = req.user
        req.body.author_id = id
        const { category_name, author_id } = req.body
        const newCategory = { category_name, author_id }
        const db = req.app.get('db')
        for (const [key, value] of Object.entries(newCategory))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })

        CategoriesService.insertCategory(
            db,
            newCategory,
        )
            .then(category => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${category.id}`))
                    .json(serializeCategory(category))
            })
            .catch(next)
    })

categoriesRouter
    .route('/:category_id')
    .all(requireAuth)
    .all((req, res, next) => {
        const { id } = req.user
        const { category_id } = req.params
        const db = req.app.get('db')
        CategoriesService.getById(
            db,
            category_id
        )
            .then(category => {
                if (!category) {

                    return res
                        .status(404)
                        .json({
                            error: {
                                message: `Category doesn't exist`
                            }
                        })
                }
                console.log('category', category)
                if (category.author_id !== id) {
                    return res.status(403)
                        .json({
                            error: {
                                message: `Forbidden`
                            }
                        })
                }
                res.category = category
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.status(200).json(serializeCategory(res.category))
    })
    .delete((req, res, next) => {
        CategoriesService.deleteCategory(
            req.app.get('db'),
            req.params.category_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { category_name } = req.body
        const categoryToUpdate = { category_name }

        const numberOfValues = Object.values(categoryToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.json({
                error: {
                    message: `Request body must contain 'category_name`
                }
            })
        }
        CategoriesService.updateCategory(
            req.app.get('db'),
            req.params.category_id,
            categoryToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = categoriesRouter

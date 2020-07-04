const path = require('path');
const express = require('express');
const RecipesService = require('./recipes-service');
const recipesRouter = express.Router();
const jsonParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');


recipesRouter
    .route('/')
    .all(requireAuth)
    .get(async (req, res, next) => {
        console.log('get endpoint reached')
        const { id } = req.user;
        console.log('id', id)
        const db = req.app.get('db');
        try {
            const recipes = await RecipesService
                .getAllRecipes(db, id);
            const ownedRecipes = recipes
                .filter(category => category.author_id === id);
            res.json(ownedRecipes.map(recipe => {
                return RecipesService.serializeRecipe(recipe)
            }));
        } catch (err) {
            next();
        };
    })
    .post(jsonParser, (req, res, next) => {
        const { id } = req.user;
        req.body.author_id = id;

        const { title,
            description,
            ingredients,
            directions,
            category_id,
            author_id } = req.body;
        const newRecipe = {
            title,
            description,
            ingredients,
            directions,
            category_id,
            author_id
        };

        if (!newRecipe.title) {
            return res.status(400).json({
                error: { message: `Missing 'title' in request body` }
            });
        };

        RecipesService.insertRecipe(
            req.app.get('db'),
            newRecipe
        )
            .then(recipe => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${recipe.id}`))
                    .json(RecipesService.serializeRecipe(recipe));
            })
            .catch(err => console.log('err', err));

    });

recipesRouter
    .route('/:recipe_id')
    .all(requireAuth)
    .all((req, res, next) => {
        const { id } = req.user
        RecipesService.getById(
            req.app.get('db'),
            req.params.recipe_id
        )
            .then(recipe => {
                if (!recipe) {
                    return res
                        .status(404)
                        .json({
                            error: {
                                message: `Recipe doesn't exist`
                            }
                        })
                }
                if (recipe.author_id !== id) {
                    // console.log('Forbidden path')
                    return res.status(403)
                        .json({
                            error: {
                                message: `Forbidden`
                            }
                        });
                };
                res.recipe = recipe;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.status(200).json(RecipesService.serializeRecipe(res.recipe));
    })
    .delete((req, res, next) => {
        RecipesService.deleteRecipe(
            req.app.get('db'),
            req.params.recipe_id
        )
            .then(numRowsAffected => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(jsonParser, (req, res, next) => {
        const { title,
            description,
            ingredients,
            directions,
            category_id } = req.body;
        const recipeToUpdate = {
            title,
            description,
            ingredients,
            directions,
            category_id,
            date_modified: new Date()
        };

        if (!recipeToUpdate.title) {
            return res.status(400).json({
                error: { message: `Missing 'title' in request body` }
            });
        };

        RecipesService.updateRecipe(
            req.app.get('db'),
            req.params.recipe_id,
            recipeToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end();
            })
            .catch(next);
    });

module.exports = recipesRouter;
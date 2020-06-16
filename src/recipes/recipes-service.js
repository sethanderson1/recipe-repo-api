const xss = require('xss')

const RecipesService = {
    getAllRecipes(knex) {
        return knex.select('*').from('recipes')
    },

    insertRecipe(knex, newRecipe) {
        return knex
            .insert(newRecipe)
            .into('recipes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex
            .select('*')
            .from('recipes')
            .where('id', id)
            .first()
    },

    deleteRecipe(knex, id) {
        return knex('recipes')
            .where('id', id)
            .delete()
    },

    updateRecipe(knex, id, newRecipeFields) {
        return knex('recipes')
            .where({ id })
            .update(newRecipeFields)
    },
    serializeRecipe(recipe) {
        return {
            id: recipe.id,
            title: xss(recipe.title),
            description: xss(recipe.description),
            ingredients: xss(recipe.ingredients),
            directions: xss(recipe.directions),
            category_id: recipe.category_id,
        }
    }

}

module.exports =  RecipesService 








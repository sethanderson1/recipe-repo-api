const CategoriesService = {
    getAllCategories(knex, user_id) {
        return knex.select('*')
            .from('categories');
    },

    insertCategory(knex, newCategory) {
        return knex
            .insert(newCategory)
            .into('categories')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },

    getById(knex, id) {
        return knex
            .select('*')
            .from('categories')
            .where('id', id)
            .first();
    },

    deleteCategory(knex, id) {
        return knex('categories')
            .where('id', id)
            .delete();
    },

    updateCategory(knex, id, newCategoryFields) {
        return knex('categories')
            .where({ id })
            .update(newCategoryFields);
    }
};

module.exports = CategoriesService
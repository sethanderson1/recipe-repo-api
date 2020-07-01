const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Categories Endpoints', () => {

    const testUsers = helpers.makeUsersArray()
    const testCategories = helpers.makeCategoriesArray()
    const testRecipes = helpers.makeRecipesArray()

    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());

    before('cleanup', () => db.raw(
        `TRUNCATE
           recipes,
           categories,
           users
        RESTART IDENTITY CASCADE`
    ));

    afterEach('cleanup', () => db.raw(
        `TRUNCATE
           recipes,
           categories,
           users
        RESTART IDENTITY CASCADE`
    ));

    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));
    beforeEach('insert categories', () => helpers.seedCategories(db, testCategories));
    beforeEach('insert recipes', () => helpers.seedRecipes(db, testRecipes));
        
    describe('POST /api/categories', () => {

            const newRecipe = {
                title: 'recipe1',
                description: 'recipe1 description',
                ingredients: 'recipe1 ingredients',
                directions: 'recipe1 directions',
                category_id: testCategories[0].id,
                author_id: testUsers[0].id
            }

            it(`Responds with 'Missing 'title' in request body' if not supplied`, () => {
                delete newRecipe.title
                return supertest(app)
                    .post('/api/recipes')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .send(newRecipe)
                    .expect(400, {
                        error: { message: `Missing 'title' in request body` }
                    })
            })

        context('Happy path', () => {
            it(`responds 201, storing recipe`, () => {
                const newRecipe = {
                    title: 'recipe1',
                    description: 'recipe1 description',
                    ingredients: 'recipe1 ingredients',
                    directions: 'recipe1 directions',
                    category_id: testCategories[0].id,
                    author_id: testUsers[0].id
                }
                return supertest(app)
                    .post('/api/recipes')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .send(newRecipe)
                    .expect(201)
                    .expect(res => { 
                        expect(res.body).to.have.property('id')
                        expect(res.body.title).to.eql(newRecipe.title)
                        expect(res.headers.location).to.eql(`/api/recipes/${res.body.id}`)
                    });
            });
        });
    });
});
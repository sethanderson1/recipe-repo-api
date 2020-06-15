const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');

describe('Users Endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
    })
    app.set('db', db)

    


})
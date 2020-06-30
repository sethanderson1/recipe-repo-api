const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers')


describe('Users Endpoints', () => {

    const testUsers = helpers.makeUsersArray()

    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    // before('cleanup', () => db('users').truncate())
    before('cleanup', () => db.raw(
        `TRUNCATE
            users
            RESTART IDENTITY CASCADE`
    ))


    afterEach('cleanup', () => db.raw(
        `TRUNCATE
            users
            RESTART IDENTITY CASCADE`
    ))

    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));


    describe('POST /api/users', () => {
        ['user_name', 'password'].forEach(field => {
            const newUser = {
                user_name: 'testUser@gmail.com',
                password: 'Password1!',
            }

            it(`Responds with '400 missing ${field}' if not supplied`, () => {
                delete newUser[field]

                return supertest(app)
                    .post('/api/users')
                    .send(newUser)
                    // todo: do i need set here?
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })

            it(`responds with 400 error when username already exists`, () => {
                const newUser = {
                    user_name: testUsers[0].user_name,
                    password: 'Password1!',
                };
                return supertest(app)
                    .post('/api/users/')
                    .send(newUser)
                    .expect(400, {
                        error: { message: `Username already taken` }
                    })
            })


            //  todo: do password tests if have time
        })


        context('Happy path', () => {
            it(`responds 201, serialized user, storing bcrypted password`, () => {
                const newUser = {
                    user_name: 'testUser1@gmail.com',
                    password: 'Password1!',
                };

                return supertest(app)
                    .post('/api/users')
                    .send(newUser)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.not.have.property('password')
                        expect(res.body.user_name).to.eql(newUser.user_name)
                        expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
                        // todo: might have to adjust date stuff
                        const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
                        const actualDate = new Date(res.body.date_created).toLocaleString('en', { timeZone: 'UTC' })
                        expect(actualDate).to.eql(expectedDate)
                    })
                    .expect(res =>
                        db
                            .from('users')
                            .select('*')
                            .where({ id: res.body.id })
                            .first()
                            .then(row => {
                                expect(row.user_name).to.eql(newUser.user_name)
                                // todo: understand dates if have time
                                const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
                                const actualDate = new Date(row.date_created).toLocaleString('en', { timeZone: 'UTC' })
                                expect(actualDate).to.eql(expectedDate)
                                return bcrypt.compare(newUser.password, row.password)
                            })
                            .then(compareMatch => {
                                expect(compareMatch).to.be.true
                            })
                    )
            })
        })
    })
})
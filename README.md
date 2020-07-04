# RECIPE REPO API

## Open Endpoints

Open endpoints require no Authentication.

* Login : `POST /api/auth/`
* SignUp : `POST /api/users/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.
`
### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

* Get all categories : `GET /api/categories/`
* Get specific category : `GET /api/categories/:categoryId`

* Get all recipes : `GET /api/recipes/`
* Get specific recipe : `GET /api/recipes/:recipeId`

* Get specific category : `GET /api/categories/:categoryId`
* Get specific category : `GET /api/categories/:categoryId`

## Technology

### Built with:
* Node.js
    * Express server framework
    * Jsonwebtoken and bcrypt.js for authentication
* PostgreSQL database
    * Knex.js for query building
    * Postgrator for versioning
* Testing on Mocha framework using Chai and Supertest

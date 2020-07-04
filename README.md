# RECIPE REPO API

## Live App

https://recipe-repo-client.now.sh/

### API Endpoint
https://tranquil-badlands-46681.herokuapp.com/

## Open Endpoints

Open endpoints require no Authentication.

* Login : `POST /api/auth/`
* SignUp : `POST /api/users/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

* Get all categories : `GET /api/categories/`
* Get specific category : `GET /api/categories/:categoryId`
* Delete a category : `DELETE /api/categories/:categoryId`

* Get all recipes : `GET /api/recipes/`
* Get specific recipe : `GET /api/recipes/:recipeId`
* Delete a recipe : `DELETE /api/recipes/:recipeId`

## Technology

### Built with:
* Node.js
    * Express server framework
    * Jsonwebtoken and bcrypt.js for authentication
* PostgreSQL database
    * Knex.js for query building
    * Postgrator for versioning
* Testing on Mocha framework using Chai and Supertest

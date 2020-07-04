# RECIPE REPO API
Server API interface for storing and delivering "Recipe Repo" data.
## Live App

https://recipe-repo-client.now.sh/

### API Endpoint
https://tranquil-badlands-46681.herokuapp.com/

## Open Endpoints

Open endpoints require no Authentication.

* SignUp : `POST /api/users/`







### Login: `POST /api/auth/`

Validates the login credentials against the database and if they are valid returns a JWT

**Sample request Body**

```json
{
  "username": "example",
  "password": "example-password"
}
```

**Sample Response Body**

```json
{
  "authToken": "thISisASampLEjwtAUthToKEN"
}
```

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.


### Get all categories `GET /api/categories/`
Returns a list of the user's categories.

**Example Request Body**

```json
[
    {
        "id": 1,
        "category_name": "Breakfast"
    },
    {
        "id": 2,
        "category_name": "Lunch"
    }
]
```

**Example Response Body**

```json
{
  "id": 1,
  "content": "test comment",
  "post_id": 1,
  "date_created": "2020-06-19T22:22:33.937Z",
  "user": {
    "id": 1,
    "username": "exampleUser",
    "img": "./example/img/url.png"
  }
}
```










* Get all categories : `GET /api/categories/`
* Post a category : `POST /api/categories/`
* Get a category : `GET /api/categories/:categoryId`
* Delete a category : `DELETE /api/categories/:categoryId`

* Get all recipes : `GET /api/recipes/`
* Post a recipe : `POST /api/recipes/`
* Get a recipe : `GET /api/recipes/:recipeId`
* Update a recipe: `PATCH /api/recipes/:recipeId`
* Delete a recipe : `DELETE /api/recipes/:recipeId`







## Delete Recipe

Delete the Recipe of the Authenticated User if they are Owner.

**URL** : `/api/recipes/:recipeId/`

**URL Parameters** : `:recipeId` is the ID of the recipe to be deleted.

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : User is Account Owner

### Success Response

**Condition** : If the Account exists.

**Code** : `204 NO CONTENT`

**Content** : `{}`

### Error Responses

**Condition** : If there was no Account available to delete.

**Code** : `404 NOT FOUND`

**Content** : `{}`

### Or

**Condition** : Authorized User is not Owner of Account at URL.

**Code** : `403 FORBIDDEN`

**Content** : `{}`










## Technology

### Built with:
* Node.js
    * Express server framework
    * Jsonwebtoken and bcrypt.js for authentication
* PostgreSQL database
    * Knex.js for query building
    * Postgrator for versioning
* Testing on Mocha framework using Chai and Supertest

## Client Repo

* https://github.com/sethanderson1/recipe-repo-client/

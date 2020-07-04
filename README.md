# RECIPE REPO API
Server API interface for storing and delivering "Recipe Repo" data.
## Live App

https://recipe-repo-client.now.sh/

### API Endpoint
https://tranquil-badlands-46681.herokuapp.com/

## Open Endpoints

Open endpoints require no Authentication.

### SignUp: `POST /api/users/`


**Sample request Body**

Adds new user credentials to database as long as are valid and name is unique

```json
{ 
    "user_name": "newuser@gmail.com",
    "password" : "Password1!"
 } 
```

**Sample Response Body**

```json
{
    "id": 2,
    "user_name": "newuser@gmail.com",
    "date_created": "2020-07-04T10:07:05.668Z",
    "date_modified": null
}
```


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

**Example Response Body**

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

### Post a category `POST /api/categories/`
Posts to database. Returns 201 status code and the category name

**Example Request Body**

```json

{ 
    "category_name": "Dinner"
 } 
 
 ```

**Example Response Body**

```json

    {
        "id": 3,
        "category_name": "Dinner"
    }
    
```


### Get a category `Get /api/categories/:categoryId`
Gets a specific category. Category with correct categoryId is sent back
with 200 status code.

**Example Response Body**

```json

    {
        "id": 3,
        "category_name": "Dinner"
    }
    
```

### Delete a category `DELETE /api/categories/:categoryId`
Deletes a specific category. Category with correct categoryId is deleted
with status code 204

### Get all recipes `GET /api/recipes`
Returns a list of the user's recipes.

**Example Response Body**

```json
[
    {
        "id": 1,
        "title": "Burger",
        "description": "It's a burger",
        "ingredients": "buns, burgers",
        "directions": "put burger in between buns",
        "category_id": 2
    },
    {
        "id": 2,
        "title": "Scrambled eggs",
        "description": "eggs that have been scrambled",
        "ingredients": "eggs",
        "directions": "scramble the eggs",
        "category_id": 2
    }
]
```


### Post a recipe `POST /api/recipes`
Post a new recipe. Return post data with status 201 created

**Example Request Body**

```json

    {
        "title": "Burger",
        "description": "It's a burger",
        "ingredients": "buns, burgers",
        "directions": "put burger in between buns",
        "category_id": 2
    }
```
**Example Response Body**

```json
    {
        "id": 1,
        "title": "Burger",
        "description": "It's a burger",
        "ingredients": "buns, burgers",
        "directions": "put burger in between buns",
        "category_id": 2
    }
```

### Get a recipe `GET /api/recipes/:recipeId`
Get a recipe by recipeId. Returns recipe data with status 200 

**Example Response Body**

```json
    {
        "id": 1,
        "title": "Burger",
        "description": "It's a burger",
        "ingredients": "buns, burgers",
        "directions": "put burger in between buns",
        "category_id": 2
    }
```
### Update a recipe `PATCH /api/recipes/:recipeId`
Update an existing recipe. Updates recipe and returns 204 no content

**Example Request Body**

```json

    {
        "title": "Cheese Burger",
        "description": "It's a cheese burger",
        "ingredients": "buns, , cheese, burgers",
        "directions": "put burger in between buns and cheese",
        "category_id": 2
    }
```

### Delete a recipe `DELETE /api/recipes/:recipeId`
Deletes an existing recipe and returns 204 no content


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

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
    return [
        {
            id: 1,
            user_name: 'test1@gmail.com',
            password: 'Password1!',
            date_created: new Date(),
            date_modified: new Date()

        },
        {
            id: 2,
            user_name: 'test2@gmail.com',
            password: 'Password1!',
            date_created: new Date(),
            date_modified: new Date()

        },
        {
            id: 3,
            user_name: 'test3@gmail.com',
            password: 'Password1!',
            date_created: new Date(),
            date_modified: new Date()

        }
    ]
}

function seedUsers(db, users) {
    const seededUsers = users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1),
    }));
    return db
      .into("users")
      .insert(seededUsers)
      .then(() => {
          // update the auto sequence to stay in sync
        return db.raw(`SELECT setval('users_id_seq',?)`, [
          users[users.length - 1].id,
        ]);
      });
  }



  // make categories

  function makeCategoriesArray() {
    return [
      {
        id: 1,
        category_name: 'testCategory1',
        author_id: 1
      },
      {
        id: 2,
        category_name: 'testCategory2',
        author_id: 1
      },
      {
        id: 3,
        category_name: 'testCategory3',
        author_id: 1
      }
    ]
  }

function seedCategories(db, categories) {
  return db
    .into("categories")
    .insert(categories)
    .then(() => {
        // update the auto sequence to stay in sync
      return db.raw(`SELECT setval('categories_id_seq',?)`, [
        categories[categories.length - 1].id,
      ]);
    });
}

function makeAuthHeader(user, secret = process.env.ACCESS_TOKEN_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}




module.exports = {
    makeUsersArray,
    seedUsers,
    makeCategoriesArray,
    seedCategories,
    makeAuthHeader
}
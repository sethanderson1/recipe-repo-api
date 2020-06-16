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

module.exports = {
    makeUsersArray,
    seedUsers
}
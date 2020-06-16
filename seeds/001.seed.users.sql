INSERT INTO users (id, user_name, password, date_created, date_modified)
VALUES 
(1,'user1@gmail.com', 'Password1!', '2020-03-22T16:28:32.615Z','2020-03-22T16:28:32.615Z'),
(2,'user2@gmail.com', 'Password1!', '2020-03-22T16:28:32.615Z','2020-03-22T16:28:32.615Z'),
(3,'user3@gmail.com', 'Password1!', '2020-03-22T16:28:32.615Z','2020-03-22T16:28:32.615Z');

SELECT * FROM users;

-- ensures id generator will start from the max id num in database
-- instead of starting at 1
SELECT setval('users_id_seq', (SELECT MAX(id) from "users"));
INSERT INTO users (id, user_name, password, date_created, date_modified)
VALUES 
-- all passwords are 'Password1!'
(1,'user1@gmail.com', '$2a$10$do9aqSHBEOX2mmidBFxxPOdknoul45m.TDoeQkdumVNrEkF2sn3KK', '2020-03-22T16:28:32.615Z','2020-03-22T16:28:32.615Z'),
(2,'user2@gmail.com', '$2a$10$4AGfWWmypn45VHgsdyMOY.xymoQInQIwtzbFWeyvUvWVknpeSWwki', '2020-03-22T16:28:32.615Z','2020-03-22T16:28:32.615Z'),
(3,'user3@gmail.com', '$2a$10$XrZZWlImZXIhAIf7b.8xqeDNK6kDU81An9lU.XzsuvgtR7hyG43fm', '2020-03-22T16:28:32.615Z','2020-03-22T16:28:32.615Z');

SELECT * FROM users;

-- ensures id generator will start from the max id num in database
-- instead of starting at 1
SELECT setval('users_id_seq', (SELECT MAX(id) from "users"));
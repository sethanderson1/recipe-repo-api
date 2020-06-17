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

INSERT INTO categories (id,category_name,author_id)
VALUES 
(1,'user1s category',1),
(2,'user2s category',2),
(3,'user3s category',3);

INSERT INTO recipes (id,title, description, ingredients, directions, date_created, date_modified,category_id,author_id)
VALUES 
(1,'user1s recipe for cat1', '1','1','1', '2023-03-22T16:28:32.615Z', '2023-03-22T16:28:32.615Z',1,1),
(2,'user2s recipe for cat2', '2','2','2', '2023-03-22T16:28:32.615Z', '2023-03-22T16:28:32.615Z',2,2),
(3,'user3s recipe for cat3', '3','3','3', '2023-03-22T16:28:32.615Z', '2023-03-22T16:28:32.615Z',3,3);

SELECT setval('recipes_id_seq', (SELECT MAX(id) from "recipes"));
SELECT setval('categories_id_seq', (SELECT MAX(id) from "categories"));

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

SELECT * FROM categories;

SELECT * FROM recipes;

INSERT INTO categories (id,category_name,author_id)
VALUES 
(1,'user1s category1',1),
(2,'user1s category2',1),
(3,'user2s category',2),
(4,'user3s category',3);

INSERT INTO recipes (id,title, description, ingredients, directions, date_created, date_modified,category_id,author_id)
VALUES 
(1,'user1s recipe1 for category1',
 'user1s recipe1 for category1',
 'user1s recipe1 for category1',
 'user1s recipe1 for category1', 
 '2023-03-22T16:28:32.615Z', 
 '2023-03-22T16:28:32.615Z',
 1,
 1),
 (2,'user1s recipe2 for category1',
 'user1s recipe2 for category1',
 'user1s recipe2 for category1',
 'user1s recipe2 for category1', 
 '2023-03-22T16:28:32.615Z', 
 '2023-03-22T16:28:32.615Z',
 1,
 1),
 (3,'user1s recipe3 for category2',
 'user1s recipe3 for category2',
 'user1s recipe3 for category2',
 'user1s recipe3 for category2', 
 '2023-03-22T16:28:32.615Z', 
 '2023-03-22T16:28:32.615Z',
 2,
 1),
(4,'user2s recipe for category2', '2','2','2', '2023-03-22T16:28:32.615Z', '2023-03-22T16:28:32.615Z',2,2),
(5,'user3s recipe for category3', '3','3','3', '2023-03-22T16:28:32.615Z', '2023-03-22T16:28:32.615Z',3,3);

SELECT setval('recipes_id_seq', (SELECT MAX(id) from "recipes"));
SELECT setval('categories_id_seq', (SELECT MAX(id) from "categories"));

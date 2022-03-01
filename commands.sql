CREATE TABLE blogs(id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);
insert into blogs(author,url,title) values ('Dan Abramov','https://www.google.com/','Writing Resilient Components');
insert into blogs(author,url,title) values ('Martin Fowler','https://www.google.com/','Is High Quality Software Worth the Cost?');
insert into blogs(author,url,title) values ('Robert C. Martin','https://www.google.com/','FP vs. OO List Processing');

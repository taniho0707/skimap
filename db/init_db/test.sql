DROP DATABASE IF EXISTS skimap_db;
CREATE DATABASE skimap_db;

USE skimap_db;

DROP TABLE IF EXISTS skimap;

CREATE TABLE skimap (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(30),
  description varchar(255)
);

DROP DATABASE IF EXISTS skimap_db;
CREATE DATABASE skimap_db;

USE skimap_db;

GRANT ALL PRIVILEGES ON *.* TO 'skimap'@'%' WITH GRANT OPTION;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id int UNIQUE NOT NULL AUTO_INCREMENT primary key,
  name varchar(30) UNIQUE NOT NULL,
  email varchar(255) UNIQUE,
  hash varchar(512)
);

DROP TABLE IF EXISTS prefecture;
CREATE TABLE prefecture (
  id int NOT NULL primary key,
  name varchar(16)
);

INSERT INTO prefecture (id, name) VALUES (1, '北海道');
INSERT INTO prefecture (id, name) VALUES (2, '青森県');
INSERT INTO prefecture (id, name) VALUES (3, '岩手県');
INSERT INTO prefecture (id, name) VALUES (4, '宮城県');
INSERT INTO prefecture (id, name) VALUES (5, '秋田県');
INSERT INTO prefecture (id, name) VALUES (6, '山形県');
INSERT INTO prefecture (id, name) VALUES (7, '福島県');
INSERT INTO prefecture (id, name) VALUES (8, '茨城県');
INSERT INTO prefecture (id, name) VALUES (9, '栃木県');
INSERT INTO prefecture (id, name) VALUES (10, '群馬県');
INSERT INTO prefecture (id, name) VALUES (11, '埼玉県');
INSERT INTO prefecture (id, name) VALUES (12, '千葉県');
INSERT INTO prefecture (id, name) VALUES (13, '東京都');
INSERT INTO prefecture (id, name) VALUES (14, '神奈川県');
INSERT INTO prefecture (id, name) VALUES (15, '新潟県');
INSERT INTO prefecture (id, name) VALUES (16, '富山県');
INSERT INTO prefecture (id, name) VALUES (17, '石川県');
INSERT INTO prefecture (id, name) VALUES (18, '福井県');
INSERT INTO prefecture (id, name) VALUES (19, '山梨県');
INSERT INTO prefecture (id, name) VALUES (20, '長野県');
INSERT INTO prefecture (id, name) VALUES (21, '岐阜県');
INSERT INTO prefecture (id, name) VALUES (22, '静岡県');
INSERT INTO prefecture (id, name) VALUES (23, '愛知県');
INSERT INTO prefecture (id, name) VALUES (24, '三重県');
INSERT INTO prefecture (id, name) VALUES (25, '滋賀県');
INSERT INTO prefecture (id, name) VALUES (26, '京都府');
INSERT INTO prefecture (id, name) VALUES (27, '大阪府');
INSERT INTO prefecture (id, name) VALUES (28, '兵庫県');
INSERT INTO prefecture (id, name) VALUES (29, '奈良県');
INSERT INTO prefecture (id, name) VALUES (30, '和歌山県');
INSERT INTO prefecture (id, name) VALUES (31, '鳥取県');
INSERT INTO prefecture (id, name) VALUES (32, '島根県');
INSERT INTO prefecture (id, name) VALUES (33, '岡山県');
INSERT INTO prefecture (id, name) VALUES (34, '広島県');
INSERT INTO prefecture (id, name) VALUES (35, '山口県');
INSERT INTO prefecture (id, name) VALUES (36, '徳島県');
INSERT INTO prefecture (id, name) VALUES (37, '香川県');
INSERT INTO prefecture (id, name) VALUES (38, '愛媛県');
INSERT INTO prefecture (id, name) VALUES (39, '高知県');
INSERT INTO prefecture (id, name) VALUES (40, '福岡県');
INSERT INTO prefecture (id, name) VALUES (41, '佐賀県');
INSERT INTO prefecture (id, name) VALUES (42, '長崎県');
INSERT INTO prefecture (id, name) VALUES (43, '熊本県');
INSERT INTO prefecture (id, name) VALUES (44, '大分県');
INSERT INTO prefecture (id, name) VALUES (45, '宮崎県');
INSERT INTO prefecture (id, name) VALUES (46, '鹿児島県');
INSERT INTO prefecture (id, name) VALUES (47, '沖縄県');

DROP TABLE IF EXISTS area;
CREATE TABLE area (
  id int NOT NULL AUTO_INCREMENT primary key,
  prefecture int NOT NULL,
  area int NOT NULL,
  official_url varchar(1024)
);

DROP TABLE IF EXISTS record;
CREATE TABLE record (
  id int NOT NULL AUTO_INCREMENT primary key,
  area int NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL
);

DROP TABLE IF EXISTS participant;
CREATE TABLE participant (
  area_id int NOT NULL,
  user_id int NOT NULL
);

DROP TABLE IF EXISTs gpslog;
CREATE TABLE gpslog (
  id int NOT NULL AUTO_INCREMENT primary key,
  filepath varchar(256) NOT NULL,
  filename varchar(256) NOT NULL,
  record_id int
);

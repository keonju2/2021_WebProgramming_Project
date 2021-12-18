
CREATE DATABASE IF NOT EXISTS web CHARACTER SET utf8 COLLATE utf8_bin;
USE web;

CREATE TABLE IF NOT EXISTS user (
  id int(12) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  coupleID varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

alter table user modify id int not null auto_increment primary key;

INSERT INTO user (id, username, password, email,coupleID) VALUES (1, 'test', 'test', 'test@test.com','test2');
INSERT INTO user (username, password, email,coupleID) VALUES ('test2', 'test2', 'test2@test.com','test');




CREATE TABLE IF NOT EXISTS posting (
  id int(12) NOT NULL,
  username varchar(50) NOT NULL,
  comment varchar(10000) NOT NULL,
  year int not null,
  month int not null,
  day int not null
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


alter table posting add constraint user foreign key(username) references user(username);

alter table posting modify id int not null auto_increment primary key;

INSERT INTO posting (username,comment,year,month,day) VALUES ('test3', 'aaaaaaaaaaaaaaaaaaaaaa',21,12,10);
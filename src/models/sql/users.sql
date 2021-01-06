-- start the server:
-- "sudo service postgresql start"

-- To config the database:
-- "psql -d petition -f config.sql"

-- To select database:
-- \c testdb


-- users
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS merchants CASCADE;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS user_addresses;
DROP TABLE IF EXISTS user_sizes;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(50) NOT NULL CHECK (first != ''),
    last VARCHAR(255) NOT NULL CHECK (last != ''),
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
    password VARCHAR(255) NOT NULL CHECK (password != ''),
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO users (first, last, email, password) VALUES ('Sherlock', 'Holmes', 'sherlockholmes@gmail.com', 'bruh');
INSERT INTO users (first, last, email, password) VALUES ('John', 'Due', 'johndue@gmail.com', 'jonson8211');


-- merchants
CREATE TABLE merchants(
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id),
    merchant_name VARCHAR(255) UNIQUE NOT NULL CHECK (merchant_name != ''),
    merchant_slug varchar(255) UNIQUE NOT NULL CHECK (merchant_slug != ''),
    created_at TIMESTAMP DEFAULT now()
);
INSERT INTO merchants (user_id, merchant_name, merchant_slug) VALUES (1, 'Sherlock''s Home Depot', 'sherlocks-home-depot');


-- user_profiles
CREATE TABLE user_profiles(
    id SERIAL PRIMARY KEY,
    birthday_day VARCHAR(2) NOT NULL CHECK (birthday_day != ''),
    birthday_month VARCHAR(2) NOT NULL CHECK (birthday_month != ''),
    birthday_year VARCHAR(4) NOT NULL CHECK (birthday_year != ''),
    gender VARCHAR(2) NOT NULL CHECK (gender != ''),
    user_id INT UNIQUE NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now()
 );

INSERT INTO user_profiles (birthday_day, birthday_month, birthday_year, gender, user_id) VALUES ('14', '2', '1957', 2, 1);


 CREATE TABLE user_addresses(
     id SERIAL PRIMARY KEY,
     address VARCHAR(255) NOT NULL CHECK (address !=''),
     postal VARCHAR(5) NOT NULL CHECK (postal != ''),
     city varchar (100) NOT NULL CHECK (city != ''),
     user_id INT UNIQUE NOT NULL REFERENCES users(id),
     created_at TIMESTAMP DEFAULT now()
  );

  INSERT INTO user_addresses (address, postal, city, user_id) VALUES ('Baker street 221b', '10405', 'Berlin', 1);


  CREATE TABLE user_sizes(
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL UNIQUE REFERENCES users(id),
      bust INT,
      shoulder INT,
      sleeve INT,
      waist INT,
      hip INT,
      inside_leg INT,
      created_at TIMESTAMP DEFAULT now()
  );
  INSERT INTO user_sizes (user_id, bust, shoulder, sleeve, waist, hip, inside_leg)
  VALUES (1, 80, 44, 74, 47, null, null);

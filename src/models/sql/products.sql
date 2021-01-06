-- start the server:
-- "sudo service postgresql start"

-- To config the database:
-- "psql -d petition -f config.sql"

-- To select database:
-- \c testdb

DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS product_category;
DROP TABLE IF EXISTS product_sizes;
DROP TABLE IF EXISTS photos;



-- Products
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    merchant_id INT NOT NULL REFERENCES merchants(id),
    product_name VARCHAR(255) UNIQUE NOT NULL CHECK (product_name != ''),
    product_slug varchar(255) UNIQUE NOT NULL CHECK (product_slug != ''),
    product_caption varchar(255),
    product_description varchar(255),
    price DECIMAL NOT NULL,
    product_status INT,
    created_at TIMESTAMP DEFAULT now()
);
INSERT INTO products (merchant_id, product_name, product_slug, product_caption, product_description, price, product_status)
VALUES (1, 'Sherloc''s Toast Machine', 'sherlocks-toast-machine', 'Made by the sharks', 'This is a description', 999.95, 1);

-- Categories
CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL CHECK (category_name != ''),
    category_slug VARCHAR(255) UNIQUE NOT NULL CHECK (category_slug != ''),
    category_caption VARCHAR(255),
    category_description VARCHAR(255),
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO categories (category_name, category_slug, category_caption, category_description) VALUES ('Dresses', 'dresses', 'A remarkable collection of dresses is sure to have you covered for any occasion', 'A remarkable collection of dresses is sure to have you covered for any occasion');
INSERT INTO categories (category_name, category_slug, category_caption, category_description) VALUES ('Blouses', 'blouses', 'A fashionable collection of blouses', 'a long loose overgarment that resembles a shirt or smock and is worn especially by workmen, artists, and peasants');
INSERT INTO categories (category_name, category_slug, category_caption, category_description) VALUES ('Skirts', 'skirts', 'A collection of skirts from tight to narrow', 'A collection of skirts from tight to narrow');
INSERT INTO categories (category_name, category_slug, category_caption, category_description) VALUES ('Evening', 'evening', 'Evening dresses for every occasion', 'Evening dresses for every occasion');
INSERT INTO categories (category_name, category_slug, category_caption, category_description)
VALUES ('Coats', 'coats', 'Coats for every occasion', 'Coats for every occasion');
INSERT INTO categories (category_name, category_slug, category_caption, category_description)
VALUES ('Jackets', 'jackets', 'Jackets for Mr and Mrs X', 'Jackets for Mr and Mrs X');

-- Pivot table
CREATE TABLE product_category(
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id,category_id)
);
INSERT INTO product_category(product_id, category_id) VALUES(1, 1);

-- Photos
CREATE TABLE photos(
    id SERIAL PRIMARY KEY,
    url VARCHAR(300) UNIQUE NOT NULL CHECK (url != ''),
    product_id INT UNIQUE NOT NULL REFERENCES products(id),
    created_at TIMESTAMP DEFAULT now()
);
INSERT INTO photos (url, product_id)
VALUES ('https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg', 1);
INSERT INTO photos (url, product_id)
VALUES ('https://coriander-imageboard.s3.amazonaws.com/-2JHzNlqo5AUlEHJieoOBb0XmxR6L7DT.jpg', 2);

CREATE TABLE product_sizes(
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id),
    size VARCHAR(10) NOT NULL CHECK (size != ''),
    length INT,
    bust INT,
    shoulder INT,
    sleeve INT,
    waist INT,
    hip INT,
    inside_leg INT,
    created_at TIMESTAMP DEFAULT now()
);


INSERT INTO product_sizes (product_id, size, length, bust, waist, hip, shoulder, sleeve, inside_leg) VALUES (8, 38, 96, 74, 62, 86, 0, 0, 0);
INSERT INTO product_sizes (product_id, size, length, bust, waist, hip, shoulder, sleeve, inside_leg) VALUES (8, 40,	97,	76,	62,	88, 0, 0, 0);
INSERT INTO product_sizes (product_id, size, length, bust, waist, hip, shoulder, sleeve, inside_leg) VALUES (8, 42,	98,	80,	66,	92, 0, 0, 0);
INSERT INTO product_sizes (product_id, size, length, bust, waist, hip, shoulder, sleeve, inside_leg) VALUES (8, 44,	98,	82,	72,	96, 0, 0, 0);
INSERT INTO product_sizes (product_id, size, length, bust, waist, hip, shoulder, sleeve, inside_leg) VALUES (8, 46,	98,	84,	96,	100, 0, 0, 0);
INSERT INTO product_sizes (product_id, size, length, bust, waist, hip, shoulder, sleeve, inside_leg) VALUES (8, 48,	98,	86,	98,	102, 0, 0, 0);
INSERT INTO product_sizes (product_id, size, length, bust, waist, hip, shoulder, sleeve, inside_leg) VALUES (8, 50,	99,	88,	100, 104, 0, 0, 0);

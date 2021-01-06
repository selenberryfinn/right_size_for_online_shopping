-- start the server:
-- "sudo service postgresql start"

-- To config the database:
-- "psql -d petition -f config.sql"

-- To select database:
-- \c testdb


-- Carts
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS cart_items;

CREATE TABLE carts(
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id),
    cart_status INT,
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO carts (user_id, cart_status) VALUES (1, 1);

-- Cart items
CREATE TABLE cart_items(
    id SERIAL PRIMARY KEY,
    cart_id INT UNIQUE NOT NULL REFERENCES carts(id),
    product_id INT UNIQUE NOT NULL REFERENCES products(id),
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (1, 1, 3);


-- cart statuses:
-- STATUS 1 - Pending: A cart that hasn't been abandoned yet, i.e. the customer is still in the store making changes to it.
-- We consider a cart abandoned one hour after the customer leaves the store.

-- STATUS 2 - Unrecoverable: An abandoned cart is a cart for which we were not able to capture the potential customer's
-- email address during their visit to your store.

-- STATUS 3 - Recoverable: An abandoned cart for which we were able to capture the potential customer's
-- email address during their visit to your store. This generally happens in one of two ways:
-- 1) The customer was logged into your store when they added products to their shopping cart.
-- 2) The customer was a guest on your store but added their email address to the checkout form before they left the store.

-- STATUS 4 - Recovered: We were able to recover the previous purchase (i.e. the customer took action based on the email(s) they received and completed the previous purchase).

-- STATUS 5 - Completed: The customer completed their purchase before any emails were triggered. CM Commerce does not count these carts towards your conversions.

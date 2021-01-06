const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const {
        DB_USERNAME,
        DB_PASSWORD
    } = require("/mnt/c/Users/kimsk/Documents/spice/coriander-finalproject/config/secrets.json");
    db = spicedPg(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/finalproject`
    );
}

const addCartItem = async (userId, { productId, quantity }) => {
    console.log("IN DB", userId, productId, quantity);
    return db.query(
        `INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES ($1, $2) RETURNING *;`,
        [userId, productId, quantity]
    );
};

module.exports = addCartItem;

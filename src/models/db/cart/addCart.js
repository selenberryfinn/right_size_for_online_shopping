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

const addCart = async (userId, { cartStatus }) => {
    console.log("IN DB", userId, cartStatus);
    return db.query(
        `INSERT INTO carts (user_id, cart_status)
        VALUES ($1, $2) RETURNING *;`,
        [userId, cartStatus]
    );
};

module.exports = addCart;

const spicedPg = require("spiced-pg");
console.log(__dirname);

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

const getCartItem = (cartId, productId) => {
    return db.query(
        `
        SELECT * FROM cart_items
        WHERE carts.id = $1
        AND cart_items.product_id = $2;`,
        [cartId, productId]
    );
};
module.exports = getCartItem;

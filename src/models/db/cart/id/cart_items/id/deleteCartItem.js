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

const deleteCartItem = cartItemId => {
    return db.query(
        `
        DELETE FROM cart_items
        WHERE id = $1;`,
        [cartItemId]
    );
};
module.exports = deleteCartItem;

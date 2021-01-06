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

const getProductSizes = productId => {
    return db.query(
        `
        SELECT size, length, bust, shoulder, sleeve, waist, hip, inside_leg
        FROM product_sizes
        WHERE product_id = $1
        ORDER BY product_sizes.size ASC;`,
        [productId]
    );
};
module.exports = getProductSizes;

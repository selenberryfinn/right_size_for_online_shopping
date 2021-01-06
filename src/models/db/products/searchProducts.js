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

const searchProducts = async query => {
    return db.query(
        `SELECT products.id, product_name, product_slug, product_caption, product_description,
        merchant_id, price, product_status, products.created_at, photos.url
        FROM products
        LEFT JOIN photos
        ON photos.product_id = products.id
        WHERE products.product_name ILIKE $1
        ORDER BY products.id DESC
        LIMIT 10;`,
        [`${query}%`]
    );
};

module.exports = searchProducts;

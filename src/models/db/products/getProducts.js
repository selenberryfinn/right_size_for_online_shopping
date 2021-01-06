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

const getProducts = () => {
    return db.query(
        `
        SELECT products.id, product_name, product_slug, product_caption, product_description,
        price, product_status, products.created_at, photos.url
        FROM products
        LEFT JOIN photos
        ON photos.product_id = products.id
        ;`
    );
};
module.exports = getProducts;

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

const getProductsByCategories = categoryIds => {
    return db.query(
        `
        SELECT DISTINCT (product_category.product_id), products.product_name, product_slug, price, products.product_caption, products.product_description, products.created_at, photos.url
        FROM product_category
        LEFT JOIN products
        ON product_category.product_id = products.id
        LEFT JOIN photos
        ON photos.product_id = products.id
        WHERE product_category.category_id IN (${categoryIds + ""});`
    );
};
module.exports = getProductsByCategories;

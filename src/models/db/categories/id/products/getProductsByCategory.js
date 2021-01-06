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

const getProductsByCategory = categoryId => {
    console.log("IN DB: getProductsByCategory", categoryId);
    return db.query(
        `
        SELECT * FROM product_category
        LEFT JOIN products
        ON product_category.product_id = products.id
        LEFT JOIN photos
        ON photos.product_id = products.id
        WHERE product_category.category_id = $1;`,
        [categoryId]
    );
};
module.exports = getProductsByCategory;

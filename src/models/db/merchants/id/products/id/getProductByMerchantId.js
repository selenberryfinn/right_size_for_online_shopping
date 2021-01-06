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

const getProductByMerchantId = (merchantId, productId) => {
    console.log("IN DB: getProductsByMerchantId", merchantId, productId);
    return db.query(
        `
        SELECT * FROM products
        LEFT JOIN photos
        ON photos.product_id = products.id
        WHERE merchant_id = $1
        AND products.id = $2;`,
        [merchantId, productId]
    );
};
module.exports = getProductByMerchantId;

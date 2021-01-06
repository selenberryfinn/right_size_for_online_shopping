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

const addProduct = async (
    merchantId,
    {
        productName,
        productSlug,
        productCaption,
        productDescription,
        price,
        productStatus
    }
) => {
    console.log(
        merchantId,
        productName,
        productSlug,
        productCaption,
        productDescription,
        price,
        productStatus
    );

    return db.query(
        `INSERT INTO products (merchant_id, product_name, product_slug, product_caption, product_description, price, product_status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (product_name) DO
        UPDATE SET product_name = $2, product_slug = $3, product_caption = $4, product_description = $5, price = $6, product_status = $7
        RETURNING *;`,
        [
            merchantId,
            productName,
            productSlug,
            productCaption,
            productDescription,
            price,
            productStatus
        ]
    );
};

module.exports = addProduct;

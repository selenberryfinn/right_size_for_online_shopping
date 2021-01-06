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

const addProductSizes = async (
    productId,
    { size, length, bust, shoulder, sleeve, waist, hip, insideLeg }
) => {
    return db.query(
        `INSERT INTO product_sizes (product_id, size, length, bust, shoulder, sleeve, waist, hip, inside_leg)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;`,
        [productId, size, length, bust, shoulder, sleeve, waist, hip, insideLeg]
    );
};

module.exports = addProductSizes;

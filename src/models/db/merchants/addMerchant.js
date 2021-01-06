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

const addMerchant = async (userId, { merchantName, merchantSlug }) => {
    console.log("IN DB", userId, merchantName, merchantSlug);
    return db.query(
        `INSERT INTO merchants (user_id, merchant_name, merchant_slug) VALUES ($1, $2, $3) RETURNING id;`,
        [userId, merchantName, merchantSlug]
    );
};

module.exports = addMerchant;

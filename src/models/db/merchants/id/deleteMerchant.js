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

const deleteMerchant = (userId, merchantId) => {
    return db.query(
        `
        DELETE FROM merchants
        WHERE user_id = $1
        AND id = $2;`,
        [userId, merchantId]
    );
};
module.exports = deleteMerchant;

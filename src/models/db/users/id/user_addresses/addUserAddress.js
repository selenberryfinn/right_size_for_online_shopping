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

const addUserAddress = async (userId, { address, postal, city }) => {
    console.log(userId, address, postal, city);
    return db.query(
        `INSERT INTO user_addresses (user_id, address, postal, city)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id) DO
        UPDATE SET address = $2, postal = $3, city = $4
        RETURNING id;`,
        [userId, address, postal, city]
    );
};

module.exports = addUserAddress;

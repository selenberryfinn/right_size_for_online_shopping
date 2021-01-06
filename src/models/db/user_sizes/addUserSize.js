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

const addUserSize = async (
    userId,
    { bust, shoulder, sleeve, waist, hip, insideLeg }
) => {
    console.log("IN DB", userId, bust, shoulder, sleeve, waist, hip, insideLeg);
    return db.query(
        `INSERT INTO user_sizes (user_id, bust, shoulder, sleeve, waist, hip, inside_leg)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (user_id) DO
        UPDATE SET bust = $2, shoulder = $3, sleeve = $4, waist = $5, hip = $6, inside_leg  = $7
        RETURNING *;`,
        [
            userId,
            bust || "0",
            shoulder || "0",
            sleeve || "0",
            waist || "0",
            hip || "0",
            insideLeg || "0"
        ]
    );
};

module.exports = addUserSize;

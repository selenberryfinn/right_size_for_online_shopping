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

const addUserProfile = async (
    userId,
    { birthdayDay, birthdayMonth, birthdayYear, gender }
) => {
    console.log(userId, birthdayDay, birthdayMonth, birthdayYear, gender);
    return db.query(
        `INSERT INTO user_profiles (user_id, birthday_day, birthday_month, birthday_year, gender) VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
        [userId, birthdayDay, birthdayMonth, birthdayYear, gender]
    );
};

module.exports = addUserProfile;

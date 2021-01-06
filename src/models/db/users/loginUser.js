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

const { promisify } = require("util");
let { compare } = require("bcryptjs");
compare = promisify(compare);

const loginUser = async ({ email, password }) => {
    // step 1 - get hashed password from db
    const result = await db.query(
        `SELECT id, password FROM users WHERE email = $1;`,
        [email]
    );
    const { rows } = result;
    if (!rows[0]) {
        return Promise.reject({
            name: "error",
            constraint: "profiles_email_key"
        });
    }
    const { password: hashed } = rows[0];
    // step 2 - compare password with hashed password
    const match = await compare(password, hashed);
    if (!match) {
        return Promise.reject({
            name: "error",
            constraint: "profiles_password_key"
        });
    } else {
        return result;
    }
};

module.exports = loginUser;

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
let { genSalt, hash } = require("bcryptjs");
hash = promisify(hash);
genSalt = promisify(genSalt);

const hashPassword = password => genSalt().then(salt => hash(password, salt));

const addUser = async ({ first, last, email, password }) => {
    const hashedPassword = await hashPassword(password);
    console.log(first, last, email, hashedPassword);
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`,
        [first, last, email, hashedPassword]
    );
};

module.exports = addUser;

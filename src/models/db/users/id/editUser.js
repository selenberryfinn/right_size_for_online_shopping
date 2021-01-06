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

const editUser = async (userId, { first, last, email, password }) => {
    const hashedPassword = await hashPassword(password);
    return db.query(
        `UPDATE users SET
            first = COALESCE($2, first),
            last = COALESCE($3, last),
            email = COALESCE($4, email),
            password = COALESCE($5, password),
        WHERE id = $1
        RETURNING *;`,
        [userId, first, last, email, hashedPassword]
    );
};
module.exports = editUser;

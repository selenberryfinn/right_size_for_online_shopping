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

const getPhotos = () => {
    return db.query(
        `
        SELECT * FROM photos;`
    );
};
module.exports = getPhotos;

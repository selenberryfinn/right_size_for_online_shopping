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

const deletePhoto = (productId, photoId) => {
    return db.query(
        `
        DELETE FROM photos
        WHERE product_id = $1
        AND id = $2;`,
        [productId, photoId]
    );
};
module.exports = deletePhoto;

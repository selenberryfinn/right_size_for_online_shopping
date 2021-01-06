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

const addPhoto = async (productId, { url }) => {
    console.log(
        "IN DB addPhoto ",
        productId,
        url,
        db
            .query(
                `INSERT INTO photos (product_id, url)
                VALUES ($1, $2)
                ON CONFLICT (product_id) DO
                UPDATE SET product_id = $1, url = $2
                RETURNING id;`,
                [productId, url]
            )
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    );
    return db.query(
        `INSERT INTO photos (product_id, url) VALUES ($1, $2)
        ON CONFLICT (product_id) DO
        UPDATE SET product_id = $1, url = $2
        RETURNING id;`,
        [productId, url]
    );
};

module.exports = addPhoto;

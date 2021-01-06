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

const addCategory = async ({
    categoryName,
    categorySlug,
    categoryCaption,
    categoryDescription
}) => {
    console.log(
        "IN DB",
        categoryName,
        categorySlug,
        categoryCaption,
        categoryDescription
    );
    return db.query(
        `INSERT INTO categories (category_name, category_slug, category_caption, category_description)
        VALUES ($1, $2, $3, $4) RETURNING *;`,
        [categoryName, categorySlug, categoryCaption, categoryDescription]
    );
};

module.exports = addCategory;

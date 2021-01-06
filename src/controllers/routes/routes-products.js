const express = require("express");
const router = express.Router();
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

// Controllers
const db = require("../db");
const s3 = require("./s3");
const { S3_URL } =
    process.env.NODE_ENV == "production"
        ? process.env
        : require(__dirname + "/../../../config/secrets.json");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/../../../uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const { requireLoggedInMerchant } = require("../middleware");

// PRODUCTS TABLE
// #1
router.post("/api/products", async (req, res) => {
    const { userId, merchantId } = req.session;
    try {
        console.log("IN POST PRODUCTS ROUTE", userId, merchantId, req.body);
        const { rows } = await db.addProduct(userId, req.body);
        console.log("AFTER DB IN POST PRODUCTS ROUTE", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/products", async (req, res) => {
    try {
        let { rows } = await db.getProducts();
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/products/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
        let { rows } = await db.getProduct(productId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post(
    "/api/products/:productId/edit",
    requireLoggedInMerchant,
    async (req, res) => {
        const { merchantId } = req.session;
        const { productId } = req.params;
        try {
            let { rows } = await db.editProduct(
                merchantId,
                productId,
                req.body
            );
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// #5
router.post(
    "/api/products/:productId/delete",
    requireLoggedInMerchant,
    async (req, res) => {
        const { merchantId } = req.session;
        const { productId } = req.params;
        try {
            let { rows } = await db.deleteProduct(merchantId, productId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

router.get("/api/products/search/:q", async (req, res) => {
    const { q } = req.params;
    try {
        console.log("IN ROUTE PRODUCT SEARCH", q);
        let { rows } = await db.searchProducts(q);
        console.log("IN ROUTE PRODUCT SEARCH AFTER DB", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// Filter products
router.get(
    "/api/merchants/:id/products",
    requireLoggedInMerchant,
    async (req, res) => {
        const { merchantId } = req.session;
        try {
            console.log("IN GET /api/products/merchants", merchantId);
            const { rows } = await db.getProductsByMerchantId(merchantId);
            console.log("AFTER DB IN GET /api/products/merchants", rows);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);
// Filter products
router.get(
    "/api/merchants/:id/products",
    requireLoggedInMerchant,
    async (req, res) => {
        const { merchantId } = req.session;
        try {
            console.log("IN GET /api/products/merchants", merchantId);
            const { rows } = await db.getProductsByMerchantId(merchantId);
            console.log("AFTER DB IN GET /api/products/merchants", rows);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

router.get(
    "/api/merchants/:merchantId/products/:productId",
    requireLoggedInMerchant,
    async (req, res) => {
        const { merchantId } = req.session;
        const { productId } = req.params;
        try {
            console.log(
                "IN GET /api/merchants/:merchantId/products/:productId",
                merchantId
            );
            const { rows } = await db.getProductByMerchantId(
                merchantId,
                productId
            );

            console.log(
                "AFTER DB IN GET /api/merchants/:merchantId/products/:productId",
                rows
            );
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// PRODUCT SIZES TABLE
// #1
// Add requireLoggedInMerchant in production
router.post("/api/products/:productId/sizes", async (req, res) => {
    const { productId } = req.params;
    try {
        console.log("IN POST PRODUCT SIZES ROUTE", productId, req.body);
        const { rows } = await db.addProductSizes(productId, req.body);
        console.log("AFTER DB IN POST PRODUCT SIZES ROUTE", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/products/:productId/sizes", async (req, res) => {
    const { productId } = req.params;
    try {
        console.log("IN /api/products/:productId/sizes", productId);
        let { rows } = await db.getProductsSizes(productId);
        console.log("IN /api/products/:productId/sizes AFTER DB", rows);
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/products/:productId/sizes/:sizeId", async (req, res) => {
    const { sizeId } = req.params;
    try {
        let { rows } = await db.getProductSize(sizeId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4

// #5
router.post(
    "/api/products/:productId/sizes/:sizesId/delete",
    requireLoggedInMerchant,
    async (req, res) => {
        const { sizesId } = req.params;
        try {
            let { rows } = await db.deleteProduct(sizesId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// CATEGORIES TABLE
// #1
router.post("/api/categories", requireLoggedInMerchant, async (req, res) => {
    try {
        console.log("IN POST CATEGORIES ROUTE", req.body);
        const { rows } = await db.addCategory(req.body);
        console.log("AFTER DB IN POST CATEGORIES ROUTE", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/categories", async (req, res) => {
    try {
        let { rows } = await db.getCategories();
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/categories/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    try {
        console.log("IN ROUTE /api/categories/${categoryId} ");
        let { rows } = await db.getCategory(categoryId);
        console.log("IN ROUTE /api/categories/${categoryId} AFTER DB ");
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post(
    "/api/categories/:categoryId/edit",
    requireLoggedInMerchant,
    async (req, res) => {
        const { categoryId } = req.params;
        try {
            let { rows } = await db.editCategory(categoryId, req.body);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// #5
router.post(
    "/api/categories/:categoryId/delete",
    requireLoggedInMerchant,
    async (req, res) => {
        const { categoryId } = req.params;
        try {
            let { rows } = await db.deleteCategory(categoryId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// #6 get products by category
router.get("/api/categories/:categoryId/products", async (req, res) => {
    const { categoryId } = req.params;
    try {
        console.log("IN ROUTE getProductsByCategory", categoryId);
        let { rows } = await db.getProductsByCategory(categoryId);
        console.log("IN ROUTE getProductsByCategory AFTER DB", rows);

        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.post("/api/categories/many/products", async (req, res) => {
    const { categoryIds } = req.body;
    try {
        console.log("IN ROUTE getProductsByCategories", categoryIds);
        let { rows } = await db.getProductsByCategories(categoryIds);
        console.log("IN ROUTE getProductsByCategories AFTER DB", rows);

        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// PHOTOS TABLE
// #1
router.post(
    "/api/products/:productId/photos",
    requireLoggedInMerchant,
    uploader.single("photo"),
    s3.upload,
    async (req, res) => {
        req.body.url = `${S3_URL}${req.file.filename}`;
        const { productId } = req.params;
        try {
            console.log(
                "IN ROUTE /api/products/${productId}/photos",
                productId,
                req.body
            );
            const { rows } = await db.addPhoto(productId, req.body);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// Add requireLoggedInAdmin in production
// #2
router.get("/api/photos", async (req, res) => {
    try {
        let { rows } = await db.getPhotos();
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get(
    "/api/photos/:photoId",
    requireLoggedInMerchant,
    async (req, res) => {
        const { merchantId } = req.session;
        const { photoId } = req.params;
        try {
            let { rows } = await db.getPhoto(merchantId, photoId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// #4

// #5
router.post(
    "/api/photos/:photoId/delete",
    requireLoggedInMerchant,
    s3.delete,
    async (req, res) => {
        const { merchantId } = req.session;
        const { photoId } = req.params;
        try {
            let { rows } = await db.deletePhoto(merchantId, photoId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

module.exports = router;

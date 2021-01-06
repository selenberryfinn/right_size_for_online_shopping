const express = require("express");
const router = express.Router();
const db = require("../db");
const { requireLoggedOutUser, requireLoggedInUser } = require("../middleware");

// USERS TABLE
// #1
router.post("/api/users", requireLoggedOutUser, async (req, res) => {
    try {
        const { rows } = await db.addUser(req.body);
        req.session.userId = rows[0].id;
        res.json({ data: "success" });
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/users", async (req, res) => {
    try {
        let { rows } = await db.getUsers();
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/users/:id", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        console.log("IN ROUTE GET USER", userId);
        let { rows } = await db.getUser(userId);
        console.log("IN ROUTE GET USER AFTER DB", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post("/api/users/:id/edit", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        let { rows } = await db.editUser(userId, req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #5
router.post("/api/users/:id/delete", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        let { rows } = await db.deleteUser(userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #6
router.post("/api/users/login", requireLoggedOutUser, async (req, res) => {
    try {
        console.log("IN ROUTE", req.body);
        const { rows } = await db.loginUser(req.body);
        console.log("BACK IN ROUTE", rows);
        req.session.userId = rows[0].id;
        console.log("BACK IN ROUTE LOGIN: LOGGED IN WITH:", req.session.userId);
        res.json({ data: "success" });
    } catch (err) {
        res.json(err);
    }
});

// #7
router.post("/api/users/logout", requireLoggedInUser, async (req, res) => {
    try {
        delete req.session.userId;
        res.json({ data: "success" });
    } catch (err) {
        res.json(err);
    }
});

// MERCHANTS TABLE
// #1
router.post("/api/merchants", async (req, res) => {
    const { userId } = req.session;
    try {
        console.log("IN Merchants POST ROUTE", req.body);
        const { rows } = await db.addMerchant(userId, req.body);
        req.session.merchantId = rows[0].id;
        console.log("BACK IN ROUTE", rows, req.session);
        res.json({ data: "success" });
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/merchants", async (req, res) => {
    const { userId } = req.session;
    try {
        let { rows } = await db.getMerchants(userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/merchants/:id", async (req, res) => {
    const { merchantId } = req.session;
    try {
        console.log("IN ROUTE GET MERCHANT", merchantId);
        let { rows } = await db.getMerchant(merchantId);
        console.log("IN ROUTE GET MERCHANT AFTER DB", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post("/api/merchants/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        let { rows } = await db.editMerchant(id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #5
router.post("/api/merchants/:merchantId/delete", async (req, res) => {
    const { merchantId } = req.params;
    const { userId } = req.session;
    try {
        let { rows } = await db.deleteMerchant(userId, merchantId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// USER_PROFILES TABLE
// #1
router.post("/api/user-profiles", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        console.log("IN USER PROFILE POST ROUTE");
        const rows = await db.addUserProfile(userId, req.body);
        console.log("BACK IN USER PROFILE POST ROUTE", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/user-profiles", async (req, res) => {
    try {
        let { rows } = await db.getUserProfiles();
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/user-profiles/:id", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        let { rows } = await db.getUserProfile(userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post(
    "/api/user-profiles/:id/edit",
    requireLoggedInUser,
    async (req, res) => {
        const { userId } = req.session;
        try {
            let { rows } = await db.editUserProfile(userId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// #5
router.post(
    "/api/user-profiles/:id/delete",
    requireLoggedInUser,
    async (req, res) => {
        const { userId } = req.session;
        try {
            let { rows } = await db.deleteUserProfile(userId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// USER_ADDRESSES TABLE
// #1
router.post("/api/user-addresses", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        const { rows } = await db.addUserAddress(userId, req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/user-addresses", async (req, res) => {
    try {
        console.log("IN USER ADDRESS ROUTE", req.body);
        let { rows } = await db.getUserAddresses();
        console.log("BACK IN ROUTE", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/user-addresses/:id", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        let { rows } = await db.getUserAddress(userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post(
    "/api/user-addresses/:id/edit",
    requireLoggedInUser,
    async (req, res) => {
        const { userId } = req.session;
        try {
            let { rows } = await db.editUserAddress(userId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// #5
router.post(
    "/api/user-addresses/:id/delete",
    requireLoggedInUser,
    async (req, res) => {
        const { userId } = req.session;
        try {
            let { rows } = await db.deleteUserAddress(userId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// USER_SIZES TABLE
// #1
router.post("/api/user-sizes", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        console.log("IN USER SIZES POST ROUTE", req.body);

        const rows = await db.addUserSize(userId, req.body);
        console.log("BACK IN USER PROFILE POST ROUTE", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/user-sizes", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        let { rows } = await db.getUserSizes(userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/user-sizes/:id", requireLoggedInUser, async (req, res) => {
    const { userId } = req.session;
    try {
        let { rows } = await db.getUserSize(userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post(
    "/api/user-sizes/:id/edit",
    requireLoggedInUser,
    async (req, res) => {
        const { userId } = req.session;
        try {
            let { rows } = await db.editUserSize(userId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

// #5
router.post(
    "/api/user-sizes/:id/delete",
    requireLoggedInUser,
    async (req, res) => {
        const { userId } = req.session;
        try {
            let { rows } = await db.deleteUserSize(userId);
            res.json(rows);
        } catch (err) {
            res.json(err);
        }
    }
);

module.exports = router;

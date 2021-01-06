const express = require("express");
const router = express.Router();
const db = require("../db");
// CARTS TABLE
// #1
router.post("/api/carts", async (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    try {
        console.log("IN ROUTE /api/carts", req.body);
        let largest = 0;
        if (req.session.cart.length != 0) {
            req.session.cart.map(num => {
                if (num.id > largest) {
                    largest = num.id;
                }
            });
        }
        req.body.id = largest + 1;
        console.log(Math.max(Object.values(req.session.cart)));
        req.session.cart = [...req.session.cart, req.body];
        console.log("IN ROUTE /api/carts AFTER SESSION", req.session);
        res.json([{ data: "success" }]);
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/carts", async (req, res) => {
    try {
        let { rows } = await db.getCarts();
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/carts/:id", async (req, res) => {
    const { cartId } = req.session;
    try {
        console.log("IN ROUTE GET CART", cartId);
        let { rows } = await db.getCart(cartId);
        console.log("IN ROUTE GET CART AFTER DB", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post("/api/carts/:id/edit", async (req, res) => {
    const { cartId } = req.session;
    try {
        let { rows } = await db.editCart(cartId, req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #5
router.post("/api/carts/:id/delete", async (req, res) => {
    // console.log("IN ROUTE /api/carts/:id/delete", req.params);
    console.log("DELETE", req.params.id);
    try {
        req.session.cart = req.session.cart.filter(
            item => item.id != req.params.id && item
        );
        // console.log("AFTER DELETE", req.session);
        res.json([{ data: "success" }]);
    } catch (err) {
        res.json(err);
    }
});

// CART ITEMS TABLE
// #1
router.post("/api/cart-items", async (req, res) => {
    const { cartId } = req.session;
    try {
        const { rows } = await db.addCartItem(cartId, req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// Add requireLoggedInAdmin in production
// #2
router.get("/api/cart-items", async (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    try {
        console.log("IN ROUTE /api/cart-items", req.session.cart);
        res.json(req.session.cart);
    } catch (err) {
        res.json(err);
    }
});

// #3
router.get("/api/cart-items/:cartItemId", async (req, res) => {
    const { cartItemId } = req.params;
    try {
        console.log("IN ROUTE GET CART ITEM", cartItemId);
        let { rows } = await db.getCartItems(cartItemId);
        console.log("IN ROUTE GET CART AFTER DB", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #4
router.post("/api/cart-items/:cartItemId/edit", async (req, res) => {
    const { cartItemId } = req.params;
    try {
        let { rows } = await db.editCartItems(cartItemId, req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// #5
router.post("/api/cart-items/:cartItemId/delete", async (req, res) => {
    const { cartItemId } = req.params;
    try {
        let { rows } = await db.deleteCartItems(cartItemId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

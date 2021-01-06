const path = require("path");

const requireLoggedOutUser = (req, res, next) => {
    console.log("IN MW", req.session.userId, req.url, path.extname(req.url));
    if (req.session.userId) {
        console.log("In MW: requires logged in user");
        return res.redirect("/");
    } else {
        next();
    }
};

const requireLoggedInUser = (req, res, next) => {
    console.log("IN MW", req.session.userId, req.url, path.extname(req.url));
    if (!req.session.userId) {
        console.log("In MW: requires logged in user");
        return res.redirect("/welcome");
    } else {
        next();
    }
};

// Merchants
const requireLoggedOutMerchant = (req, res, next) => {
    if (req.session.merchantId) {
        console.log("In MW: requires logged out merchant");
        return res.redirect("/petition");
    } else {
        next();
    }
};

const requireLoggedInMerchant = (req, res, next) => {
    console.log(
        "IN MW",
        req.session.merchantId,
        req.url,
        path.extname(req.url)
    );
    if (!req.session.merchantId) {
        console.log("In MW: requires logged in merchant");
        return res.redirect("/");
    } else {
        next();
    }
};

module.exports = {
    requireLoggedOutUser,
    requireLoggedInUser,
    requireLoggedOutMerchant,
    requireLoggedInMerchant
};

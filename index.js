const express = require("express");
const app = (exports.app = express());
const db = require("./src/controllers/db");

// Socket.io
const compression = require("compression");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "http://localhost:8080" }); // add " myherokuapp.herokuapp.com:*" to origins when deploying
const { SESSION_SECRET: sessionSecret } =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("./config/secrets.json");

const csurf = require("csurf");
// Reqruie Routers
const usersRouter = require("./src/controllers/routes/routes-users");
const productsRouter = require("./src/controllers/routes/routes-products");
const cartsRouter = require("./src/controllers/routes/routes-carts");
// -------------
// -------------
// -------------

// Required to run React
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// Middleware

app.use(compression());
app.use(express.urlencoded({ extended: false }));
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(express.json());
app.use(csurf()); // place after body-parsing (urlencoded) and cookieSession.
app.use(function(req, res, next) {
    res.cookie("csrfToken", req.csrfToken());
    next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.static("public"));
// API Routes
app.use(usersRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.get("/p", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", (req, res) => {
    if (req.session.userId) {
        res.redirect("/p");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

if (require.main === module) {
    // app.listen(process.env.PORT || 8080, console.log("I'm listening!"));
    server.listen(process.env.PORT || 8080, console.log("I'm listening!"));
}

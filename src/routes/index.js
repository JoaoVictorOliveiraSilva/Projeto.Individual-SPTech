/*var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.sendFile("index");
});

module.exports = router;*/
var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/index.html", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/home.html"));
});

module.exports = router;
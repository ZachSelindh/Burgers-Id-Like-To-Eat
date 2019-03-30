var express = require("express");
var Burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
  Burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

module.exports = router;
// router is exported to server.js

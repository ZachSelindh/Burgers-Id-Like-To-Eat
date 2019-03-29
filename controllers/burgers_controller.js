var express = require("express");
var burger = require("../models/burger.js");

var router = express.router();

router.get("/", fnction(req, res) {
    burger.selectAll(function(data) {
        var object = {
            burgers: data
        }
        res.render("index", object);
    })
})
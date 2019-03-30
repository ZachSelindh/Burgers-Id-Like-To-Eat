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

router.put("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;
  console.log("condition at cont:" + condition);
  Burger.update(
    {
      devoured: 1
    },
    condition,
    function(data) {
      if (data.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

module.exports = router;
// router is exported to server.js

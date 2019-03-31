var express = require("express");
var Burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
  Burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  Burger.create(
    ["burger_name", "devoured"],
    [req.body.name, req.body.devoured],
    function(data) {
      res.json({ id: data.insertId });
    }
  );
});

router.put("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;
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

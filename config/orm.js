var connection = require("./connection");

//Helper function for populating queries.
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert values to MySQL-readable.
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    let queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, data) {
      if (err) throw err;
      cb(data);
    });
  },
  insertOne: function(table, col, vals, cb) {
    let queryString = "INSERT INTO " + table + " (";
    queryString += col.toString() + ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length) + ");";
    connection.query(queryString, function(err, data) {
      if (err) throw err;
      cb(data);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table + " SET ";
    queryString += objToSql(objColVals) + " WHERE ";
    queryString += condition;
    connection.query(queryString, function(err, data) {
      if (err) throw err;
      cb(data);
    });
  }
};

module.exports = orm;
// orm is being exported to Burger.js

var connection = require("./connection");

//Helper function for populating queries.
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    let queryString = "SELECT * FROM " + table + ";";
    let query = connection.query(queryString, function(err, data) {
      console.log(query.sql);
      if (err) throw err;
      cb(data);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table + " (";
    queryString += cols.toString() + ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length) + ");";
    connection.query(queryString, vals, function(err, data) {
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

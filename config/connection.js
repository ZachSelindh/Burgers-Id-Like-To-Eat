var mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection({
    host: "g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "ymszksmujy762gzu",
    password: "u7a8yqw6dgbr8ggn",
    database: "jlu0pthh1lv3lje0"
  });
} else {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
  });
}

connection.connect(function(err) {
  if (err) {
    console.error("Error: " + err.stack);
    return;
  }
  connection.query(`
  CREATE TABLE burgers (
  id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
  burger_name VARCHAR(100),
  devoured BOOLEAN DEFAULT FALSE
  );
  
  INSERT INTO burgers (burger_name)
VALUES 
("Double-Double"),
("Bacon Whataburger"),
("Sonic Jalapeno Double")
 ;`);
  console.log("Connected as ID " + connection.threadId);
});

module.exports = connection;
// connection is exported to orm.js

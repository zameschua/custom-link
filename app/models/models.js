const mysql = require('mysql');

console.log("Connecting to mySQL database...");
const connection = mysql.createConnection({
  host: "localhost",
  user: "herochua",
  password: "9517503a",
  database: "custom-link"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mySQL database!");
});

module.exports = connection;

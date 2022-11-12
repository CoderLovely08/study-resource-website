var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12561563",
  password: "MAkRFeRh3z"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
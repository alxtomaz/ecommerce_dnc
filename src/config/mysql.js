var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "alex",
  password: "123456",
  database: "ecommerce_dnc"
});

con.connect(function(err) {
    if (err) {
      console.error('Error connecting to Db', err);
      return process.exit(1);
    }
    console.log('Connection established');
  });

  module.exports = con;
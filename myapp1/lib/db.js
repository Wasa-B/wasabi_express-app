var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'nodejs',
  password:'11111111',
  database:'opentutorials'
});
db.connect();

module.exports = {
    connection : db
}
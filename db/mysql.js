const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Last10.iam',
  database: 'Inventory_toMe'
})

module.exports = connection;
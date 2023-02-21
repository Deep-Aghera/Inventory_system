const express = require('express');
const { connect } = require('./db/mysql');
const app = express();
const PORT = process.env.PORT || 3000;
const con = require('./db/mysql');

// >>>>>>>>>>>>>>>> middleware <<<<<<<<<<<<<<<<
app.use(express.json())



// >>>>>>>>>>>>>>>>  router <<<<<<<<<<<<<<<<<<<<<<<<<<
const inventoryRoute = require('./router/inventory');

app.get('/',(req,res) => {
    res.send("this is home page");
})

app.use(inventoryRoute)
con.query('show tables;',(err,rows,field) => {
    if(err) throw err
    console.log("this list of table toMe",rows);
})


app.listen(PORT,() => {
    console.log(`app is listning at ${PORT}`)
})
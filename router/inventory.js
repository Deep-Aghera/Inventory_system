const express = require('express');
const fileUpload = require('express-fileupload');
const { copyFileSync } = require('fs');
const router = new express.Router();
let fetchData  = require('../PromiseQuery/fetchData');
const con = require('../db/mysql');
const { resolve } = require('path');
const { rejects } = require('assert');
const fs = require('fs');



let arrayCompare = (requredEelemnt,toBeCheckedElement) => {
   
        let result  = requredEelemnt.every(element => {
            return toBeCheckedElement.includes(element)
            
        });
        return result;
    
}

router.post('/inventory/add',fileUpload(),async(req,res) => {
    let requiredItemForAdd = ["product_name","category","quantity","manufacturing_time","inventory_image"];
    console.log("here your ",req.body.product)
    let bodyData = JSON.parse(req.body.product)
    let body = Object.keys(bodyData);
    let isValidate = arrayCompare(requiredItemForAdd,body)
    let {product_name,category,quantity,manufacturing_time, inventory_image,expiry_time } = bodyData;
    
    if(!isValidate) {
        return res.send("Please provide required element");
    } 
   let insetQuery = `INSERT INTO Products 
   (Product_name,Product_category,Quantity,Manufacturing_time,Product_image,Expiry_time)
   VALUES ('${product_name}','${category}','${quantity}','${manufacturing_time}','${inventory_image}','${expiry_time}');`
   console.log(insetQuery)
   
   let inserQ = new Promise((resolve,rejects) => {
    con.query(insetQuery,(err,result) => {
        if(err) rejects("some thing went wrong in inserting data");
        resolve(result);
       // console.log("toMe::::",result)
    })

   })
   
   let iData =await inserQ.then(data => data).catch((err) => err);
   console.log(iData.insertId);
    let insertedId = iData.insertId;
    let inventoryFile = req.files.inventoryFile;
    inventoryFile['name'] = `${insertedId}.jpg`;
    console.log("hello inventory name",inventoryFile.name);
    console.log("hello inventory",inventoryFile);
   inventoryFile.mv(`./img/${inventoryFile.name}`,(err) => {
    if(err) console.log("err at img ::::",err);
    console.log("imgae adde");
   })
   res.send("item added sucessfully ")
})

//fetchData('show tables;',con.query).then((data) => {console.log(data)})

router.get('/inventory/search/',async (req,res) => {
    console.log(req.query)
    let searchQery  = req.query;
    console.log(!searchQery.name,!searchQery.category )
    if(!searchQery.name && !searchQery.category) {
        return res.send("Please provide search parameter");
    }
    const searchSqlQuery = `select * from Products where Product_name='${searchQery.name}' && Product_category='${searchQery.category}';`
    console.log(searchSqlQuery)

    let sQuery = new Promise((resolve,rejects) => {
         con.query(searchSqlQuery,(err,result) => {
        if(err){
            rejects(err)
          
        }

        resolve(result)

    })
    })

   let data = await sQuery.then((data) => data).catch((err) => err);
   
   console.log(data[0].Expiry_time.toString());
   let expiry_time_mysql = data[0].Expiry_time.toString();
   let expiry_time_nodejs = new Date(expiry_time_mysql);
   console.log(expiry_time_nodejs > new Date())
   
    res.send("search request toMe");
})


router.delete('/inventory/remove/:id',(req,res) => {
    console.log(req.params.id);
    let deleteQuery = `delete from Products where Product_id=${req.params.id}`;
    console.log(deleteQuery)

    fs.unlinkSync(`./img/${req.params.id}.jpg`,(err) => {
        if(err) console.log('something wrong');
        console.log("deleted image")
    })

    con.query(deleteQuery,(err,result) => {
        if(err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
    res.send("ok delete")
})

router.patch('/inventory/update/:id',(req,res) => {
    
    let updateQuery = `update Products set Quantity=${req.body.qunatity} where Product_id=${req.params.id}`
    //console.log(req.params.id,updateQ,req.body);
    let updateQ = new Promise((resolve,rejects) => {
        con.query(updateQuery,(err,result) => {
            if(err) console.log("err update ::::",err);
            console.log("updated",result)
        })
    })
    res.send("update")
})

router.post('/test/inventory/add',fileUpload(), (req,res) => {
    // let requiredItemForAdd = ["product_name","category","quantity","manufacturing_time","inventory_imag"];
    // let body = req.body
    // //let isValidate = arrayCompare(requiredItemForAdd,body)
    // console.log(typeof(new Date(body.expiry_time)))
    // let temp = new Date();

    // console.log("here ",temp.toISOString().slice(0,19).replace("T",' '))
   
    // res.send("test inventory add")
    let product  =  req.body.product
     console.log(typeof(req.body.product));
    // console.log(req.body.product,"\n",product)
    console.log(JSON.parse(product))
    // console.log(JSON.parse('{"product_name" : "monitor","category" : "it","quantity" : 12,"manufacturing_time" : "2010-04-30 07:27:39","inventory_image" :"now.jpg","expiry_time" : "2010-04-30 07:27:39"}'));
    // console.log("sprator ",typeof(data));
    // console.log(JSON.parse(data))
    // res.send("ok dokey");
})


module.exports = router;
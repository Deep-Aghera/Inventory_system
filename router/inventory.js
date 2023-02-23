const express = require('express');
const fileUpload = require('express-fileupload');
const { copyFileSync } = require('fs');
const router = new express.Router();

const con = require('../db/mysql')

let arrayCompare = (requredEelemnt,toBeCheckedElement) => {
   
        let result  = requredEelemnt.every(element => {
            return toBeCheckedElement.includes(element)
            
        });
        return result;
    
}

router.post('/inventory/add',fileUpload(),(req,res) => {
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
    con.query(insetQuery,(err,result) => {
        if(err) throw Error("somthing wront in insert");
        console.log("toMe::::",result)
    })

    let inventoryFile = req.files;
    console.log("hello inventory",inventoryFile);
   
   
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
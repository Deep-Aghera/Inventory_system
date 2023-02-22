const express = require('express');
const { copyFileSync } = require('fs');
const router = new express.Router();

const con = require('../db/mysql')

let arrayCompare = (requredEelemnt,toBeCheckedElement) => {
   
        let result  = requredEelemnt.every(element => {
            return toBeCheckedElement.includes(element)
            
        });
        return result;
    
}

router.post('/inventory/add',(req,res) => {
    let requiredItemForAdd = ["product_name","category","quantity","manufacturing_time","inventory_image"];
    let body = Object.keys(req.body);
    let isValidate = arrayCompare(requiredItemForAdd,body)
    let {product_name,category,quantity,manufacturing_time, inventory_image,expiry_time } = req.body;
   
   let insetQuery = `INSERT INTO Products 
   (Product_name,Product_category,Quantity,Manufacturing_time,Product_image,Expiry_time)
   VALUES ('${product_name}','${category}','${quantity}','${manufacturing_time}','${inventory_image}','${expiry_time}');`
   console.log(insetQuery)
    con.query(insetQuery,(err,result) => {
        if(err) throw Error("somthing wront in insert");
        console.log("toMe::::",result)
    })
    if(!isValidate) {
        return res.send("Please provide required element");
    } 

   
})


router.post('/test/inventory/add',(req,res) => {
    let requiredItemForAdd = ["product_name","category","quantity","manufacturing_time","inventory_imag"];
    let body = req.body
    //let isValidate = arrayCompare(requiredItemForAdd,body)
    console.log(typeof(new Date(body.expiry_time)))
    let temp = new Date();

    console.log("here ",temp.toISOString().slice(0,19).replace("T",' '))
   
    res.send("test inventory add")
})


module.exports = router;
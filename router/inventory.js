const express = require('express');
const { copyFileSync } = require('fs');
const router = new express.Router();


router.post('/add',(req,res) => {
    console.log(req.body)
    res.send("All set In inventory");
})

module.exports = router;
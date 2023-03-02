const jwt = require('jsonwebtoken');
const con = require('../db/mysql');

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,"justAnSecret");
        const findQuery = `select * from Persons where email='${decoded.email}'`
        const userPromise = new Promise(((resolve,reject) => {
              con.query(findQuery,(err,result) => {
            if(err) reject(err);
            resolve(result)
        })
        }))
        let user = await userPromise.then(data => data).catch(err => err)
        console.log(user[0])
        if(!user.length) {
            
            return res.send("unable to auth");
        }
        next();
        
    } catch (error) {
        
    }
}

module.exports = auth;
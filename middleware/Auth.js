const jwt = require('jsonwebtoken');
const con = require('../db/mysql');

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,"justAnSecret");
        const findQuery = `select * from Persons where id=${decoded.id}`
        const user = await con.query(findQuery,(error,result) => {
            if(error) throw Error("somthing mis::::");
            return result;
        })
    } catch (error) {
        
    }
}
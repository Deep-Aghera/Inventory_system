let fetchData =  (query,queryFun) => {
    let p = new Promise((resove,reject) => {
        queryFun(query,(err,result) => {
            if(err){
                reject(err)
            } else {
                resove(result);
            }
        })
    })

    return p;

}


module.exports = fetchData;
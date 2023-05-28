const jwt = require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"attryb",(err,decoded)=>{
            if(decoded){
                req.body.dealer=decoded.dealerid // adding (dealerID) in note object.
                next()
            }else{
                res.send("Please Login")
            }
        })
    }else{
        res.send("Please Login")
    }
}

module.exports={auth}
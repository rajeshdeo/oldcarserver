const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const { DealerModel } = require("../model/dealer.model")

const dealerRouter = express.Router()

dealerRouter.post("/register",async(req,res)=>{
    const {name,email, password} = req.body
    try{
        bcrypt.hash(password, 5/*Salt rounds Number of time increption used*/ , async(err, hash)=>{
            if(err){
                console.log({"msg":"Error Occured","error":err.message})
            }else{
                let user = new DealerModel({name,email,password:hash})
                await user.save()
                res.send({"msg":"New user registered"})
            }
            // Store hash in your password DB.
        });
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
dealerRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    console.log('email,password:', email,password)
    try{
        const user = await DealerModel.find({email})
        console.log('user:', user)
        let token = jwt.sign({dealerid:user[0]._id},"attryb") // passing userID so that we get it when we decode{in auth middleware}
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    res.send({"msg":"Login Success","token":token})
                }else{
                    console.log({"msg":"Error Occured","error":err})
                }
            });
        }else{
            res.send({"msg":"Wrong Credentials"})
        }
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

module.exports={
    dealerRouter
}
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User.model");

const userrouter = express.Router();

//all users

userrouter.get("/", async (req, res) => {
  try {
    const notes = await User.find();
    res.send(notes.reverse());
  } catch (error) {
    console.log(error)
  }

});

userrouter.post("/register" , async(req,res)=>{
  const {email,password,username,profilePicture}=req.body

  const userEmail=await User.findOne({email})

  if(userEmail){
      res.send({"message":"This Email is already registered"})
  }
  else{

      try{
          bcrypt.hash(password, 5, async(err, secure_password)=> {
              if(err){
                  console.log(err)
              }else{
                      const user = new User({email,password:secure_password,username,profilePicture})
                      await user.save()
                      console.log(user)
                          res.send({"message" :"Registered Successfully"})
               }
      });
         
      }
      catch(err){
          console.log(err)
          console.log({"message":"SignUp failed, please try again"})
      }
  }
  

})

//login
userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");

          res.send({ massege: "login successful", token: token, userID: user[0]._id });
        } else {
          res.send({ massege: "something went wrong" });
        }
      });
    } else {
      res.send({ massege: "wrong coredentials" });
    }
  } catch (error) {
    res.send({ massege: "something went wrong" });
  }
});





//update user
userrouter.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
userrouter.delete("/:id", async (req, res) => {
  // if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

//get a user by id
userrouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});




//search



userrouter.get("/search/:username", async (req, res) => {
  const userdata = req.params.username;

  try {
    const user = await User.find(  { username: { $regex: userdata || "", $options: 'i' } },);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});






module.exports = {
  userrouter,
};
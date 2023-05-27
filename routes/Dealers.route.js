const {DealersModel} = require("../model/Dealers.model");
const express = require("express");
const DealersRoute = express.Router();


//get all post from DealersModel

DealersRoute.get("/:color/:pri/:mi", async (req, res) => {
  const original_paint = req.params.color;
  const price = req.params.pri;
  const mileage = req.params.mi;

  if(original_paint === "all" && price === "all" && mileage === "all" ){
    try {
      const notes = await DealersModel.find();
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(original_paint !== "all" && price === "all" && mileage === "all"){
    try {
      const notes = await DealersModel.find({original_paint});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(original_paint === "all" && price !== "all" && mileage === "all"){
    try {
      const notes = await DealersModel.find({ price:{ $gt: price } });
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(original_paint === "all" && price === "all" && mileage !== "all"){
    try {
      const notes = await DealersModel.find({ mileage:{ $gt:mileage} });
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(original_paint !== "all" && price !== "all" && mileage === "all"){
    try {
      const notes = await DealersModel.find({original_paint,price:{ $gt: price }});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(original_paint === "all" && price !== "all" && mileage !== "all"){
    try {
      const notes = await DealersModel.find({mileage:{ $gt:mileage},price:{ $gt: price }});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(original_paint !== "all" && price === "all" && mileage !== "all"){
    try {
      const notes = await DealersModel.find({mileage:{ $gt:mileage},original_paint});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(original_paint !== "all" && price !== "all" && mileage !== "all"){
    try {
      const notes = await DealersModel.find({mileage:{ $gt:mileage},original_paint,price:{ $gt: price }});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }
  
  
  });




//create a post

DealersRoute.post("/", async (req, res) => {
  const newPost = new DealersModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost)
  } catch (err) {
    res.status(500).json(err);
  }
});


// get post by id

DealersRoute.get("/:id", async (req, res) => {
  try {
    const post = await DealersModel.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete
DealersRoute.delete("/:id", async (req, res) => {
  // if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await DealersModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Post has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

// update


DealersRoute.put("/:id", async (req, res) => {

  let post_id = req.params.id
  let obj = req.body

  // console.log(post_id, obj)



    try {
      const user = await DealersModel.findByIdAndUpdate(post_id, {
        $set: obj,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  


});


// search 


DealersRoute.get("/search/:q", async (req, res) => {
  const data = req.params.q;

  try {
    const user = await DealersModel.find(  { model_name: { $regex: data || "", $options: 'i' } },);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = {
    DealersRoute,
  };
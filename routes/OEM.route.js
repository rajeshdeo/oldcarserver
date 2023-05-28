const express = require("express")
const { OEMSpecsModel } = require("../model/oem.model")
const OEMRouter = express.Router()

// get OEM Data with or without search
OEMRouter.get("/", async (req, res) => {
  let { search } = req.query;

  try {
    const data = search ? await OEMSpecsModel.find(
        { $text: { $search: search } },
        { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } })
        :
        await OEMSpecsModel.find()

    res.send(data);
  } catch (err) {
    res.send(err.message);
    console.log('err:', err);
  }
});

OEMRouter.get("/:id", async (req, res) => {
    const ID = req.params.id
    console.log('id:', ID)
  
    try {
      const data = await OEMSpecsModel.find({_id:ID})
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
      console.log('err:', err);
    }
  });
  

// First Time OEM data POST
OEMRouter.post("/post",async(req,res)=>{
    const data = req.body.data
    console.log('data:', data)
    try{
        const notes = await OEMSpecsModel.insertMany(data)
        res.send(notes)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
module.exports={
    OEMRouter
}
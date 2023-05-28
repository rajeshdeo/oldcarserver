const express = require("express")
const { MarketplaceInventoryModel } = require("../model/marketplaceInventory.model")

const MarketplaceInventoryRouter = express.Router()

MarketplaceInventoryRouter.get("/", async (req, res) => {
    let { search } = req.query;
    console.log('search:back', search)
  
    try {
      const data = search ? await MarketplaceInventoryModel.find(
          { $text: { $search: search } },
          { score: { $meta: "textScore" } }
          ).sort({ score: { $meta: "textScore" } }).populate('oemSpecs')
          :
          await MarketplaceInventoryModel.find().populate('oemSpecs')
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
      console.log('err:', err);
    }
  });


// get specific dealer's Inventory
MarketplaceInventoryRouter.get("/dealer",async(req,res)=>{
    const ID = req.body.dealer
    try{
        console.log('ID:', ID)
        const notes = await MarketplaceInventoryModel.find({ dealer: ID }).populate('dealer').populate('oemSpecs')
        res.send(notes)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
// post in specific dealer's Inventory
MarketplaceInventoryRouter.post("/create", async(req,res)=>{
    const payload = req.body
    const newNote = new MarketplaceInventoryModel(payload)
    await newNote.save()
    res.send(newNote)
})

// delete in specific dealer's Inventory
MarketplaceInventoryRouter.delete("/delete/:id",async(req,res)=>{
    const ID = req.params.id
    try{
        await MarketplaceInventoryModel.findByIdAndDelete({_id:ID})
        res.send(`Note with ID ${ID} Deleted`)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

// update in specific dealer's Inventory
MarketplaceInventoryRouter.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id
    try{
        let data = await MarketplaceInventoryModel.findByIdAndUpdate({_id:ID},req.body)
        res.send(data)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

module.exports={
    MarketplaceInventoryRouter
}
const express = require("express")
require('dotenv').config()
const cors = require('cors')
const { connection } = require("./db")
const { MarketplaceInventoryRouter } = require("./routes/MarketplaceInventory.route")
const { dealerRouter } = require("./routes/Dealer.route")
const { OEMRouter } = require("./routes/OEM.route")
const { auth } = require("./middleware/Auth.middleware")
const { MarketplaceInventoryModel } = require("./model/marketplaceInventory.model")

const app=express()
app.use(cors())
app.use(express.json())

MarketplaceInventoryRouter.get("/",async(req,res)=>{
    try{
        const oldCars = await MarketplaceInventoryModel.find().populate('oemSpecs')
        res.send(oldCars)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
app.use("/dealer",dealerRouter)
app.use(auth)
app.use("/OEM",OEMRouter)
app.use("/MarketplaceInventory",MarketplaceInventoryRouter)

app.get("/",(req,res)=>{
    res.send("Home page")
})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log('err:', err)
    }
    console.log(`server running at PORT ${process.env.port}`)
})
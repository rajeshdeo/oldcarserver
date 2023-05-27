const mongoose = require("mongoose");

const dealersSchema = new mongoose.Schema(
  {
    model_name: String,
    year_model: String,
    original_paint: String,
    img: String,
    km_run:  String,
    major_scratches: String,
    number_of_accidents_reported: String,
    number_of_previous_buyers:  String,
    registration_place:  String,
    postTime:String,
    description:String,
    dealer_Id:String,
    mileage:Number,
    price:Number,
  },
  { timestamps: false }
);
const DealersModel = mongoose.model("Dealersmodel", dealersSchema);
module.exports=  {DealersModel}

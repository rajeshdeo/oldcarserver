const mongoose= require("mongoose")

const OEMSchema = new mongoose.Schema(
    {
      model_name: String,
      year_model: String,
      price: String,
      colors: String,
      mileage: String,
      Power: String,
      max_speed: String,
      img: String,
    },
    { timestamps: false }
  );
  const OEMModel = mongoose.model("OEMModel", OEMSchema);
  
  module.exports={OEMModel}
  
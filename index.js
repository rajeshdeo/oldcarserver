const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userrouter } = require("./routes/user.route");
// const { auth } = require("./middlewares/authentication.middleware");
require("dotenv").config();
const { DealersRoute } = require("./routes/Dealers.route");
const { OEM_SpecsRoute } = require("./routes/OEM_Specs.route");

let app = express();
app.use(express.json());
app.use(cors());




app.use("/user", userrouter);
app.use("/dealers", DealersRoute);
app.use("/oem", OEM_SpecsRoute);










//get


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
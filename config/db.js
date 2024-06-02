const url = "mongodb+srv://talentmatrix:talentmatrix123@talent-matrix-db.gplfkmy.mongodb.net/talentmatrix?retryWrites=true&w=majority&appName=talent-matrix-db";

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

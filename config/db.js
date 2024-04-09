const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongo ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`error connecting to mongo ${error}`.bgRed.white);
  }
};

module.exports = connectDB;

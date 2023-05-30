const mongoose = require("mongoose");

const connectToDb = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  console.log("connected successfully");

  return db;
};

module.exports = connectToDb;

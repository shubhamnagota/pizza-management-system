const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    pizza: { type: String, required: true },
    status: { type: String, default: "created" }, // created, dough, topping, oven, shipped, delivered
    statusTimestamps: {
      created: Date,
      dough: Date,
      topping: Date,
      oven: Date,
      shipped: Date,
      delivered: Date, // total of all status above
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);

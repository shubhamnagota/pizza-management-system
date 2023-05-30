const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    toppings: { type: Array, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pizza", pizzaSchema);

const asyncHandler = require("express-async-handler");

const PizzaModel = require("../models/Pizza");
const OrderModel = require("../models/Order");

const { doughQueueHandler } = require("../handlers/queueHandler");

const addPizzas = asyncHandler(async (req, res) => {
  await PizzaModel.create(req.body);
  res.json({ message: "added successfully" });
});

const getPizzas = asyncHandler(async (req, res) => {
  const pizzas = await PizzaModel.find({});
  res.json(pizzas);
});

const orderPizzas = asyncHandler(async (req, res) => {
  const pizzas = req.body;

  const dbOrders = await OrderModel.create(
    pizzas.map((pizza) => ({
      pizza,
      statusTimestamps: {
        created: new Date().toISOString(),
      },
    })),
  );

  global.io.emit("newOrders", dbOrders);
  res.json({ message: "Order placed successfully", orders: dbOrders });
  doughQueueHandler(dbOrders);
});

const getOrders = asyncHandler(async (req, res) => {
  const dbOrders = await OrderModel.find({});
  res.json(dbOrders);
});

module.exports = { getPizzas, addPizzas, orderPizzas, getOrders };

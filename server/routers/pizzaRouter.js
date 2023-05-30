const { Router } = require("express");

const pizzaController = require("../controllers/pizzaController");

const pizzaRouter = Router();

pizzaRouter.get("/", pizzaController.getPizzas);
pizzaRouter.post("/", pizzaController.addPizzas);

pizzaRouter.post("/order", pizzaController.orderPizzas);
pizzaRouter.get("/order", pizzaController.getOrders);

module.exports = pizzaRouter;

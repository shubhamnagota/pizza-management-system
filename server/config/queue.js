const async = require("async");

const doughQueue = async.queue((order, executed) => {
  console.log("Order Status (dough)" + JSON.stringify(order._id));

  setTimeout(() => {
    // Number of orders remaining and to be processed
    const ordersRemaining = doughQueue.length();
    executed(null, { order, ordersRemaining });
  }, 7 * 1000); // 7 seconds per dough
}, 2); // concurrency value = 2 (dough chefs)

const toppingQueue = async.queue((order, executed) => {
  console.log("Order Status (topping)" + JSON.stringify(order._id));

  setTimeout(() => {
    // Number of orders remaining and to be processed
    const ordersRemaining = toppingQueue.length();
    executed(null, { order, ordersRemaining });
  }, 4 * 1000); // 4 seconds per topping
}, 3 * 2); // concurrency value = 3 (topping chefs) * 2 topping per chef at a time

const ovenQueue = async.queue((order, executed) => {
  console.log("Order Status (oven)" + JSON.stringify(order._id));

  setTimeout(() => {
    // Number of orders remaining and to be processed
    const ordersRemaining = ovenQueue.length();
    executed(null, { order, ordersRemaining });
  }, 10 * 1000); // 10 seconds per pizza in oven
}, 1); // concurrency value = 1 (only one oven)

const waiterQueue = async.queue((order, executed) => {
  console.log("Order Status (waiter)" + JSON.stringify(order._id));

  setTimeout(() => {
    // Number of orders remaining and to be processed
    const ordersRemaining = waiterQueue.length();
    executed(null, { order, ordersRemaining });
  }, 5 * 1000); // 5 seconds per waiter to deliver to customer
}, 2); // concurrency value = 2 (waiters)

module.exports = { doughQueue, toppingQueue, ovenQueue, waiterQueue };

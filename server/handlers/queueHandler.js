const { doughQueue, toppingQueue, ovenQueue, waiterQueue } = require("../config/queue");
const { updateOrderStatus } = require("./dbHandler");

const getCurrentQueuesStatus = () => {
  console.log(
    JSON.stringify(
      {
        doughQueue: doughQueue.length(),
        toppingQueue: toppingQueue.length(),
        ovenQueue: ovenQueue.length(),
        waiterQueue: waiterQueue.length(),
      },
      null,
      4,
    ),
  );
};

const doughQueueHandler = (orders) => {
  orders.forEach((order) => {
    updateOrderStatus(order._id, "dough");
    doughQueue.push(order, (error, { order, ordersRemaining }) => {
      if (error) {
        console.log(`An error occurred while processing order ${order_.id}`);
      } else {
        toppingQueueHandler(order);
        getCurrentQueuesStatus();
        console.log(`Finished processing dough ${order._id}. ${ordersRemaining} dough remaining`);
      }
    });
  });
};

const toppingQueueHandler = (order) => {
  updateOrderStatus(order._id, "topping");
  toppingQueue.push(order, (error, { order, ordersRemaining }) => {
    if (error) {
      console.log(`An error occurred while processing order ${order_.id}`);
    } else {
      ovenQueueHandler(order);
      getCurrentQueuesStatus();
      console.log(`Finished processing topping ${order._id}. ${ordersRemaining} toppings remaining`);
    }
  });
};

const ovenQueueHandler = (order) => {
  updateOrderStatus(order._id, "oven");
  ovenQueue.push(order, (error, { order, ordersRemaining }) => {
    if (error) {
      console.log(`An error occurred while processing order ${order_.id}`);
    } else {
      waiterQueueHandler(order);
      getCurrentQueuesStatus();
      console.log(`Finished processing oven ${order._id}. ${ordersRemaining} oven remaining`);
    }
  });
};

const waiterQueueHandler = (order) => {
  updateOrderStatus(order._id, "shipped");
  waiterQueue.push(order, (error, { order, ordersRemaining }) => {
    if (error) {
      console.log(`An error occurred while processing order ${order_.id}`);
    } else {
      getCurrentQueuesStatus();
      updateOrderStatus(order._id, "delivered");
      console.log(`Finished processing deliver ${order._id}. ${ordersRemaining} deliver remaining`);
    }
  });
};

module.exports = { doughQueueHandler };

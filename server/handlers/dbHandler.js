const OrderModel = require("../models/Order");

const updateOrderStatusToClient = (orderId, status, statusTimestamps) => {
  global.io.emit("orderStatusUpdate", { orderId, status, statusTimestamps });
};

const updateOrderStatus = async (orderId, status) => {
  let timeStampKey = `statusTimestamps.${status}`;

  const { _doc: updated } = await OrderModel.findByIdAndUpdate(
    orderId,
    {
      $set: {
        status,
        [timeStampKey]: new Date().toISOString(),
      },
    },
    { new: true },
  );

  updateOrderStatusToClient(updated._id, status, updated.statusTimestamps);
};

const cleanUpOrders = async () => {
  await OrderModel.deleteMany({});
};

module.exports = { updateOrderStatus, cleanUpOrders };

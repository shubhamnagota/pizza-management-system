import { useState } from "react";
import { uniqBy } from "lodash";
import moment from "moment";

import { socket } from "../../config/api";

const PizzaOrders = () => {
  const [pizzaOrders, setPizzaOrders] = useState([]);

  socket.on("newOrders", (data) => {
    setPizzaOrders((orders) => uniqBy([...orders, ...data], "_id"));
  });

  socket.on("orderStatusUpdate", (data) => {
    const newOrders = window.structuredClone(pizzaOrders).map((e) => {
      if (e._id === data.orderId) {
        return { ...e, status: data.status, statusTimestamps: data.statusTimestamps };
      }

      return { ...e };
    });

    setPizzaOrders(newOrders);
    console.log(`Order ${data.orderId} status updated to ${data.status}`);
  });

  return (
    <div className="pizza-orders-container">
      {pizzaOrders.map((order) => {
        const createdAt = moment(order.statusTimestamps.created);
        const deliveredAt = moment(order.statusTimestamps.delivered);

        const minutes = deliveredAt.diff(createdAt, "minutes");
        const seconds = deliveredAt.diff(createdAt, "seconds");

        let timeTaken = `${minutes ? `${minutes} minutes ` : ""}${seconds} seconds`;

        return (
          <div className="order-item" key={order._id}>
            <div className="order-details">
              <h4>{order.pizza}</h4>
              <p>{createdAt.format("LLL")}</p>
            </div>

            <div className="order-status">
              <div>Current Status : {order.status}</div>

              <ul>
                {Object.keys(order.statusTimestamps).map((timeKey) => {
                  return (
                    <li key={`${order._id}-${timeKey}`}>
                      {timeKey} {moment(order.statusTimestamps[timeKey]).format("mm:ss")}
                    </li>
                  );
                })}
              </ul>

              <div>Total time: {timeTaken}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PizzaOrders;

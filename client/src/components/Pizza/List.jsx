import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../../config/api";

import "./pizza.scss";

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizzas, setSelectedPizzas] = useState([]);

  useEffect(() => {
    (async () => {
      const [err, data] = await API({ url: "/pizza", method: "GET" });
      if (err) {
        console.log(err);
        return;
      }
      setPizzas(data);
    })();
  }, []);

  const handleSelectedPizzas = (name) => {
    if (selectedPizzas.includes(name)) {
      setSelectedPizzas(selectedPizzas.filter((e) => e !== name));
    } else {
      setSelectedPizzas([...selectedPizzas, name]);
    }
  };

  const onSumitOrders = async (e) => {
    e.preventDefault();

    await API({ url: "/pizza/order", method: "POST", body: selectedPizzas });
    toast("Order placed successfully!");
    setSelectedPizzas([]);
  };

  return (
    <div className="pizza-list-container">
      <div className="pizza-list">
        {pizzas.map(({ name, toppings }, idx) => {
          return (
            <div
              className={`pizza-item ${selectedPizzas.includes(name) ? "pizza-item--selected" : ""}`}
              key={idx}
              onClick={() => handleSelectedPizzas(name)}
            >
              <div className="pizza-image"></div>
              <h4 className="pizza-title">{name}</h4>
              <ul>
                {toppings.map((topping) => (
                  <li key={`${name}-${topping}`}>{topping}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <button className="order-button" disabled={selectedPizzas.length === 0} onClick={onSumitOrders}>
        Order Now
      </button>
    </div>
  );
};

export default PizzaList;

import { ToastContainer } from "react-toastify";

import PizzaList from "./components/Pizza/List";
import PizzaOrders from "./components/Pizza/Orders";

const App = () => {
  return (
    <div className="app-container">
      <ToastContainer />
      <PizzaList />
      <PizzaOrders />
    </div>
  );
};

export default App;

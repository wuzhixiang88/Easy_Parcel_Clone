import "./App.css";
import { Route, Switch } from "react-router";
import Navbar from "./components/Navbar.jsx";
import CustomerPage from "./pages/CustomerPage";
import DeliverymanPage from "./pages/DeliverymanPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/customer">
          <CustomerPage />
        </Route>
        <Route path="/deliveryman">
          <DeliverymanPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

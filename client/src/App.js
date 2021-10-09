import "./App.css";
import { Route, Switch } from "react-router";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomerPage from "./pages/CustomerPage";
import DeliverymanPage from "./pages/DeliverymanPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <RegisterPage />
        </Route>
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

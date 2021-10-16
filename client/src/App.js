import "./App.css";
import { Route, Switch } from "react-router";
import Navbar from "./components/Navbar.jsx";
import NavSidebar from "./components/NavSidebar.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomerPage from "./pages/CustomerPage";
import CustomerInboxPage from "./pages/CustomerInboxPage.jsx";
import DeliverymanPage from "./pages/DeliverymanPage";
import DeliveryRoute from "./components/DeliveryRoute";
import DeliverymanInboxPage from "./pages/DeliverymanInboxPage";
import AboutUsPage from "./pages/AboutUsPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div id="main-nav-bar">
        <Navbar />
      </div>
      <div id="main-wrapper">
        <div id="sidebar-wrapper">
          <NavSidebar />
        </div>
        <div id="page-wrapper">
          <p>(Page Display)</p>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/about">
              <AboutUsPage />
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
            <Route path="/customerinbox">
              <CustomerInboxPage />
            </Route>
            <Route path="/deliveryman">
              <DeliverymanPage />
            </Route>
            <Route path="/route">
              <DeliveryRoute />
            </Route>
            <Route path="/deliverymaninbox">
              <DeliverymanInboxPage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import { Route, Switch } from "react-router";
import Navbar from "./components/Navbar";
import NavSidebar from "./components/NavSidebar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomerPage from "./pages/CustomerPage";
import CustomerInboxPage from "./pages/CustomerInboxPage";
import DeliverymanPage from "./pages/DeliverymanPage";
import DeliveryRoute from "./components/DeliveryRoute";
import DeliverymanInboxPage from "./pages/DeliverymanInboxPage";
import AboutUsPage from "./pages/AboutUsPage";
import Thread from "./components/Thread";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loggedInUserRole, setLoggedInUserRole] = useState();

  return (
    <div className="App">
      <div id="main-nav-bar">
        <Navbar setLoggedInUserRole={setLoggedInUserRole} />
      </div>
      <div id="main-wrapper">
        <div id="sidebar-wrapper">
          <NavSidebar loggedInUserRole={loggedInUserRole} />
        </div>
        <div id="page-wrapper">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/about">
              <AboutUsPage />
            </Route>
            <Route path="/login">
              <LoginPage setLoggedInUserRole={setLoggedInUserRole} />
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
            <Route exact path="/deliverymaninbox">
              <DeliverymanInboxPage />
            </Route>
            <Route exact path="/deliverymaninbox/:id">
              <Thread />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

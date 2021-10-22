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
import DeliverymanThread from "./components/DeliverymanThread";
import CustomerThread from "./components/CustomerThread";
import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loggedInUserRole, setLoggedInUserRole] = useState(() => {
    return localStorage.getItem("role");
  });

  return (
    <div className="App">
      <div id="main-nav-bar">
        <Navbar
          loggedInUserRole={loggedInUserRole}
          setLoggedInUserRole={setLoggedInUserRole}
        />
      </div>
      <div id="main-wrapper">
        <div id="sidebar-wrapper">
          <NavSidebar loggedInUserRole={loggedInUserRole} />
        </div>
        <div id="page-wrapper">
          <Switch>
            <Route exact path="/">
              <HomePage loggedInUserRole={loggedInUserRole} />
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
            <Route exact path="/customerinbox">
              <CustomerInboxPage />
            </Route>
            <Route exact path="/customerinbox/:id">
              <CustomerThread />
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
              <DeliverymanThread />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

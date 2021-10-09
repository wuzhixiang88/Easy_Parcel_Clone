import "./App.css";
import { Route, Switch } from "react-router";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuotePage from "./pages/QuotePage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";

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
        <Route path="/quote">
          <QuotePage />
        </Route>
        <Route path="/details">
          <DetailsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

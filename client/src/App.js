import './App.css';
import { Route, Switch } from 'react-router';
import Navbar from './components/Navbar.jsx';
import QuotePage from './pages/QuotePage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/quote" >
          <QuotePage />
        </Route>
        <Route path="/details" >
          <DetailsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

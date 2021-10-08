import './App.css';
import { Route, Switch } from 'react-router';
import Navbar from './components/Navbar';
import QuotePage from './pages/QuotePage';
import DetailsPage from './pages/DetailsPage';

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

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CardDetails from './components/CardDetails';
import CreateForm from './components/CreateForm';

function App() {
  return (
    <BrowserRouter>
        <Route exact path='/' component={LandingPage}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path="/breed/:id" render={({ match }) => <CardDetails id={match.params.id} />} />
        <Route exact path="/create" component={CreateForm}></Route>
    </BrowserRouter>
  );
}

export default App;

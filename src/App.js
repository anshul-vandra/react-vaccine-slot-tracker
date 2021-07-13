import './App.css';
import Header from './components/Header'
import Pin from './components/Pin'
import District from './components/District'
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer limit={3} />
      <Switch>
        <Route path='/pin' exact component={Pin}></Route>
        <Route path='/' exact component={District}></Route>
      </Switch>
    </div>
  );
}

export default App;

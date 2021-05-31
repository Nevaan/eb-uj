import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route} from 'react-router-dom';
import Dumb from './components/Dumb';

function App() {
  return (
    <div className="App">
                <BrowserRouter>
                  <ul>
                    <li><Link to="/">Dumb</Link></li>
                  </ul>
                  <Route path="/" component={Dumb}/>
                </BrowserRouter>
    </div>
  );
}

export default App;

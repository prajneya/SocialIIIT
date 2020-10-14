import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Register from './components/Register/Register';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/register" component={Register} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
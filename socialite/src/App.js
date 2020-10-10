import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
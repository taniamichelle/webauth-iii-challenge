import React from 'react';
import {Route} from 'react-router-dom';
import './App.scss';

import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome!</h1>
      </header>
      <div className='routes'>
        <Route exact path='/' component={Home} />
        {/* <Route path='/login' component={Login} /> */}
        {/* <PrivateRoute path='/logout' component={Users} /> */}
      </div>
    </div>
  );
}

export default App;

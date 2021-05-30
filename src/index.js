import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ShowStates } from './states';
import './index.css';

const ImporvedHomePage = (props) => {
  return (
    <Router>
      <div className='header'>Vaccine Findrr (1st dose only)</div>
      <div className='container1'>
        <div className='col'>
          <Switch>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const Home = (props) => {
  return <ShowStates />;
};

ReactDOM.render(<ImporvedHomePage />, document.getElementById('root'));

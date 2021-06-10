import React, { Fragment } from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

import Home from './views/Home';
import Login from './views/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <Route component={Home} exact path="/"/>
            <Route component={Login} exact path="/login"/>
          </Switch>
        </HashRouter>


      </Fragment>
    )
  }
}

export default App;

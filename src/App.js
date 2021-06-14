import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home/index';
import System from './views/System/index';

import PrivateRouter from './components/privateRouter/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={Home} exact path="/"/>
          <PrivateRouter component={System} path="/system"/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;

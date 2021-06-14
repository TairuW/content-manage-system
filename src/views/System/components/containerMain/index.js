import React from 'react';
import { Switch } from 'react-router-dom';

// privateRouter
import PrivateRouter from '../../../../components/privateRouter/index';

//auto-create components
import Components from './auto-create-components';

class ContainerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        {
          Components.map(item => {
            return <PrivateRouter exact path={item.path} key={item.key} component={item.component}/>
          })
        }
      </Switch>       
    )
  }
}

export default ContainerMain;
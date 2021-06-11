import React, { Component, Fragment } from 'react';

import { Button } from 'antd';

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Fragment>
                <Button type="primary">Register</Button>
            </Fragment>
        );
    }
}
 
export default System;
import React from 'react';

import AsideMenu from './asideMenu/index';

class LayoutAside extends  React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <AsideMenu/>
        )
    }
}

export default LayoutAside;
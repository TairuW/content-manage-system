import React, {Fragment} from 'react';

import './aside.scss';

import { MenuFoldOutlined } from "@ant-design/icons";

class LayoutAside extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: props.collapsed,
        }
    }

    toggleMenu = () => {
        this.props.toggle();
    }
    
    render(){
        return (
            <Fragment>
                <span className="collapsed-icon" onClick={this.toggleMenu}><MenuFoldOutlined/></span>
            </Fragment>
        )
    }
}

export default LayoutAside;
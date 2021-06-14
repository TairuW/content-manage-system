import React, { Component } from 'react';
import "./layout.scss";
// Components
import LayoutAside from './components/aside';
import LayoutHeader from './components/header';
import ContainerMain from './components/containerMain/index';
// antd
import { Layout } from 'antd';

const { Sider, Header, Content } = Layout;

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    toggleCollapsed = () => {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
        sessionStorage.setItem("collapsed", collapsed);
    }

    render() { 
        return (
            <Layout className='layout-wrap'>
                <Sider width='250px' collapsed={this.state.collapsed}><LayoutAside/></Sider>
                <Layout>
                    <Header className='layout-header'><LayoutHeader toggle={this.toggleCollapsed}/></Header>
                    <Content className='layout-content'>
                        <ContainerMain/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
 
export default System;
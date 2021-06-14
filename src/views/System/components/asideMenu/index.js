import React, { Fragment } from 'react';
import '../aside.scss';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Router from '../../../../routes/index';

const { SubMenu } = Menu;

class AsideMenu extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedKeys: [],
            openKeys: [],
            subMenuKeys: [],
        };
    }

    componentDidMount(){
        const pathname = this.props.location.pathname;
        const menuKey = pathname.split('/').slice(0,-1).join('/');
        const menuHighlight = {
            selectedKeys: [pathname],
            openKeys: [menuKey],
        }
        this.selectMenuHighlight(menuHighlight);
    }

    selectMenu = ({key, keyPath}) => {
        const menuHighlight = {
            selectedKeys: [key],
            openKeys: [keyPath[keyPath.length-1]],
        }
        this.selectMenuHighlight(menuHighlight);
    }

    selectMenuHighlight = ({ selectedKeys, openKeys }) => {
        this.setState({
            selectedKeys,
            openKeys,
        })
    }

    openMenu = (Keys) => {
        const latestOpenKey = Keys.find(key => this.state.openKeys.indexOf(key) === -1);
        const rootSubmenuKeys = ["/system/user", "/system/department", "/system/position"];
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({
                openKeys: [Keys[Keys.length-1]],
            })
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            })
        }
    }

    renderMenu = ({title, key, icon}) => {
        return (
            <Menu.Item key={key} icon={icon}>
                <Link to={key}>{title}</Link>
            </Menu.Item>
        )
    }

    renderSubMenu = ({title, key, icon, child}) => {
        return (
            <SubMenu key={key} icon={icon} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ?
                        this.renderSubMenu(item) : this.renderMenu(item);
                    })
                }
            </SubMenu>
        )
    }

    render(){
        const {selectedKeys, openKeys} = this.state;
        return (
            <Fragment>
                <h1 className='logo'><span>LOGO</span></h1>
                <Menu 
                onClick={this.selectMenu}
                onOpenChange={this.openMenu}
                theme='dark'
                mode="inline"
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                style={{ height: '100%', borderRight: 0}}
                >
                    {
                        Router && Router.map(OutterItem => {
                            return OutterItem.child && OutterItem.child.length > 0 ?
                             this.renderSubMenu(OutterItem) : this.renderMenu(OutterItem);
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(AsideMenu);
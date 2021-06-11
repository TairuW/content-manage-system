import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import "./index.scss";
// ATN Design
import { Form, Input, Button, Row, Col, message} from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined} from '@ant-design/icons';
// utils
import { validate_password } from '../../utils/validate';
//cookies
import { setToken, setUsername } from '../../utils/cookies';
// api
import { UserLogin } from '../../api/account';
// Component
import Captcha from '../../components/captcha/index';
// crypto
import CryptoJs from 'crypto-js';

class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: "",
            password: "",
            captcha: "",
            module: "login",
            loading: false,
        };
    }

    componentDidMount() {
        // this.getUserInfo();
    }

    getUserInfo = async () => {
        const res = await fetch('http://localhost:8000/post')
        const data = await res.json();
        console.log(data);
    }

    LoginInfo = async (user) => {
        const res = await fetch('http://localhost:8000/post', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        const data = await res.json();
        console.log(data);
    }

    onFinish = (values) => {
        const requestData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            captcha: this.state.captcha,
        }
        this.setState({
            loading: true,
        });

        this.props.history.push('/system');

        UserLogin(requestData).then(response => {
            message.success(response.data.message);
            this.setState({
                loading: false,
            });
            const data = response.data.data;
            // save token and username
            setToken(data.token);
            setUsername(data.username);
            // reroute
            // this.props.history.push('/index');
        }).catch(error => {
            this.setState({
                loading: false,
            });
        });
    }

    toggleForm = () => {
        this.props.switchForm("register");
    }

    inputChangeUsername = (e) => {
        let value = e.target.value;
        this.setState({ 
            username: value
        })
    }

    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({ 
            password: value
        })
    }

    inputChangeCaptcha = (e) => {
        let value = e.target.value;
        this.setState({ 
            captcha: value
        })
    }

    render() {
        const { username, password, captcha, module, loading} = this.state;
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">Login</h4>
                    <span><Button type="ghost" onClick={this.toggleForm}>Register</Button></span>
                </div>
                <div className="form-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: 'Username cannot be empty' },
                                { type: "email", message: 'Invalid Email'},
                            ]
                        }>
                            <Input 
                            value = {username} 
                            onChange={this.inputChangeUsername}
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Enter your username" 
                            />
                        </Form.Item>

                        <Form.Item name="password" rules={
                            [
                                { required: true, message: 'Password cannot be empty' },
                                { min: 6, message: 'Password must be at least 6 characters'},
                                { max: 12, message: 'Password must be at most 12 characters'},
                                { pattern: validate_password, message: 'Enter a valid password'}
                            ]
                        }>
                            <Input  
                            value = {password} 
                            onChange={this.inputChangePassword}
                            prefix={<LockOutlined className="site-form-item-icon" />} 
                            type="password" placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item name="verification" rules={
                            [
                                { required: true, message: 'Captcha cannot be empty' },
                                { len: 6, message: 'Captcha must be 6 characters'},
                            ]
                        }>
                            <Row gutter={13}>
                                <Col span={12}>
                                    <Input 
                                    value = {captcha} 
                                    onChange={this.inputChangeCaptcha}
                                    prefix={<KeyOutlined className="site-form-item-icon" />} 
                                    placeholder="Enter captcha" />
                                </Col>
                                <Col span={12}>
                                    <Captcha username = {username} module = {module}/>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading = {loading}
                            className="login-form-button" 
                            block>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}
export default withRouter(Login);
import React, { Fragment } from 'react';
import "./index.scss";

// Ant Design
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';

// Validations
import { validate_pin } from '../../utils/validate';

// api
import { UserRegister } from '../../api/account';

// Components
import Captcha from '../../components/captcha/index';

// crypto
import CryptoJs from 'crypto-js';

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: "",
            password: "",
            captcha: "",
            module: "register",
            loading: false,
        };
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

        UserRegister(requestData).then(response => {
            this.setState({
                loading: false,
            });
            if (response.resCode === 1) {
                message.error(response.message);
            } else if (response.resCode === 0) {
                message.success(response.message);
                this.toggleForm();
            }
        }).catch(err => {
            message.error("Unable to register");  
            this.setState({
                loading: false,
            });
        })
    }

    toggleForm = () => {
        this.props.switchForm("login");
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
        const { username, password, captcha, module, loading } = this.state;
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">Register</h4>
                    <span><Button type="ghost" onClick={this.toggleForm}>Log in</Button></span>
                </div>
                <div className="form-content">
                    <Form
                    name="normal_register"
                    className="register-form"
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
                                ({ getFieldValue }) => ({ 
                                    validator(role, value) {
                                        let confirm_pin = getFieldValue('confirm_password');
                                        
                                        if(!validate_pin(value)){
                                            return Promise.reject('Invalid password');
                                        }

                                        if(confirm_pin && value !== confirm_pin) {
                                            return Promise.reject('Password do not match')
                                        }

                                        return Promise.resolve();
                                    }
                                })
                            ]
                        }>
                            <Input 
                            value = {password} 
                            onChange={this.inputChangePassword}
                            prefix={<LockOutlined className="site-form-item-icon" />} 
                            type="password" 
                            placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item name="confirm_password" rules={
                            [
                                { required: true, message: 'Password cannot be empty'  },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (getFieldValue('password') !== value) {
                                            return Promise.reject('Password do no match');
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]
                        }>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirm your password" />
                        </Form.Item>

                        <Form.Item name="verification" rules={[{ required: true, message: 'Please input your Code!', len:6 }]}>
                            <Row gutter={13}>
                                <Col span={12}>
                                    <Input 
                                    value = {captcha} 
                                    onChange={this.inputChangeCaptcha}
                                    prefix={<KeyOutlined className="site-form-item-icon" />} 
                                    placeholder="Verification Code" />
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
                            className="login-form-button" 
                            loading = {loading}
                            block>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}
export default Register;
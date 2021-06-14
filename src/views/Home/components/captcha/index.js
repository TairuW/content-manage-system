import React from 'react';
// ATN Design
import { Button, message } from 'antd';
import { GetCode } from '../../../../api/account';

import { validate_email } from '../../../../utils/validate';

let timer = null;

class Captcha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            button_text: "Get Captcha",
            button_disabled: false,
            button_loading: false,
            module: props.module,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.username !== state.username) {
            return {
              username: props.username,
            }
        }
        return null;
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    getCaptcha = () => {
        const username = this.state.username;
        if (!username) {
            message.warning("Username is required", 1);
            return false;
        }
        if (!validate_email(username)) {
            message.warning("Username is not valid", 1);
            return false;
        }
        this.setState({
            button_loading: true,
            button_text: "Sending",
        })
        const requestData ={
            username: username,
            module: this.state.module,
        }
        GetCode(requestData).then(response => {
            message.success("Your verification code: " + response.captcha);
            this.countDown();
        }).catch(error => {
            message.error('Captcha unsent');
            this.setState({
                button_loading: false,
                button_text: "Resend Captcha",
            })
        })
    }

    countDown = () => {
        let sec = 5;
        this.setState({
            button_disabled: true,
            button_loading: false,
            button_text: `${sec}s`
        })

        timer = setInterval(() =>{
            sec--;
            if (sec <= 0) {
                this.setState({
                    button_disabled: false,
                    button_text: `Resend Captcha`,
                })
                return false;
            }
            this.setState({
                button_text: `${sec}s`
            })
        },1000)
    }


    render() {
        return (
            <Button 
            type="danger"
            onClick={this.getCaptcha}
            disabled={this.state.button_disabled}
            loading={this.state.button_loading} 
            block>
                {this.state.button_text}
            </Button>
        )
    }
}

export default Captcha;
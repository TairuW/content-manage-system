import React from 'react';
import "./index.scss";

import Login from './login';
import Register from './register';

class Index extends React.Component {
    constructor(props) {
        super();
        this.state = {
            formtype: "login"
        };
    }

    switchForm = (value) =>{
        this.setState({ formtype: value })
    }

    render() {
        return (
            <div className="form-wrap">
                <div>
                    {this.state.formtype === "login" 
                    ? <Login switchForm = {this.switchForm}></Login> 
                    : <Register switchForm = {this.switchForm}></Register>}                    
                </div>
            </div>
        )
    }
}
export default Index;
import React from "react";
import "./style.css"

const USERNAME = "username";
const PASSWORD = "password";

const USERNAME_LOGIN = "admin";
const PASSWORD_LOGIN = "admin";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.onChangeUserName = this.onChangeInfoLogin.bind(this, USERNAME);
        this.onChangePassword = this.onChangeInfoLogin.bind(this, PASSWORD);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }

    onChangeInfoLogin(type, e) {
        if(e && e.target && e.target.value) {
            this.setState({
                [type]: e.target.value
            });
        } else {
            this.setState({
                [type]: ""
            });
        }
    }

    onSubmitLogin() {
        if(this.state.username === USERNAME_LOGIN && this.state.password === PASSWORD_LOGIN) {
            this.props.onActionLogin();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="row mb-2">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4 text-center">
                            <span>Login</span>
                        </div>
                    </div>
                    <div className="input-group mp-3 mb-2">
                        <input placeholder="Username" className="form-control" 
                            value={this.state.username} onChange={this.onChangeUserName}/>
                    </div>
                    <div className="input-group mp-3 mb-2">
                        <input placeholder="password" type="password"  className="form-control"
                            value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4">
                            <button onClick={this.onSubmitLogin} type="button" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
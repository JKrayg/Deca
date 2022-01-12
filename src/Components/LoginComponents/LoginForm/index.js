import React from 'react'
import './style.css'
import { withRouter } from "react-router";

//Email Login form-------------------------[KEEP]
function LoginForm(props) {
    return (
        <React.Fragment>
            <div>
                <h1 id='memberHead'>Already a member?</h1>
                <form id='loginStyle'>
                    <h1 id='loginHead'>Login</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                        className="form-control"
                        id="usernameLogin"
                        type="name"
                        value={props.usernameLogin}
                        placeholder="-"
                        name="usernameLogin"
                        onChange={props.handleInputChange}
                        required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordLogin">Password</label>
                        <input
                        className="form-control"
                        id="passwordLogin"
                        type="password"
                        value={props.passwordLogin}
                        placeholder="-"
                        name="passwordLogin"
                        onChange={props.handleInputChange}
                        required
                        />
                    </div>
                    <button onClick={props.handleLogin} type='submit' id="loginBtn" className="btn btn-success">Log In</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default withRouter(LoginForm);

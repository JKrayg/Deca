import React from 'react'
import './style.css'

//Email sign up form-------------------------[KEEP]
function SignUpForm(props) {
    return (
        <React.Fragment>
            <div id="signUpStyle">
                    <h1 id="signUpHeader">Or sign up with an email</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="signUpUsername">Username</label>
                            <input
                            className="form-control"
                            id="signUpUsername"
                            type="username"
                            value={props.username}
                            placeholder="-"
                            name="username"
                            onChange={props.handleInputChange}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signUpEmailInput">Email</label>
                            <input
                            className="form-control"
                            id="signUpEmailInput"
                            type="email"
                            value={props.email}
                            placeholder="-"
                            name="email"
                            onChange={props.handleInputChange}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInput">Password</label>
                            <input
                            className="form-control"
                            id="passwordInput"
                            type="password"
                            value={props.password}
                            placeholder="-"
                            name="password"
                            onChange={props.handleInputChange}
                            required
                            />
                        </div>
                        <button id="signUpBtn" onClick={props.handleSignUp} type="submit" className="btn btn-primary">Sign
                            Up</button><br />
                        <div id="followIcons" className="icons">
                            <p id="followUsHead">Follow Us</p>
                            <a href="https://twitter.com/explore" target="_blank" rel="noopener noreferrer"><img
                                    id="iconStyle" alt="twitter" href="https://twitter.com/explore"
                                    src="https://static.techspot.com/images2/downloads/topdownload/2014/05/twitter.jpg" /></a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img
                                    id="iconStyle" alt="facebook"
                                    src="https://cdn.techinasia.com/wp-content/uploads/2009/07/button-facebook.png" /></a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img
                                    id="iconStyle" alt="instagram"
                                    src="https://i2.wp.com/imermanangels.org/wp-content/uploads/2014/03/instagram-1.png?ssl=1" /></a>
                        </div>
                    </form>
                </div>
        </React.Fragment>
    )
}

export default SignUpForm;


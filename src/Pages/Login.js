import React, { Component } from 'react'
import Header from '../Components/LoginComponents/Header';
import WalletSignIn from '../Components/LoginComponents/WalletSignIn';
import Geometry from '../Components/LoginComponents/Geometry';
import Moralis from 'moralis'
// import { useMoralis } from 'react-moralis';
// import { useMoralis } from 'react-moralis';
// import LoginForm from '../Components/LoginComponenets/LoginForm'
// import SignUpForm from '../Components/LoginComponenets/SignUpForm';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Login extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        usernameLogin: "",
        passwordLogin: "",
        signedIn: false
    }

    componentDidMount = () => {
        console.log("hello")
    }

    //input listener
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };



    //email sign up----------------------[KEEP]
    handleSignUp = async (e) => {
        e.preventDefault();
        console.log("signup clicked");
        let newUser = this.state.username;
        let newEmail = this.state.email;
        let newPass = this.state.password;

        const user = new Moralis.User();
        user.set("username", newUser);
        user.set("email", newEmail);
        user.set("password", newPass);

        try {
            await user.signUp();
        } catch (error) {
            alert("Error: " + error.code + " " + error.message);
        }
        console.log(user);
    }



    //email login------------------------[KEEP]
    handleLogin = async (e) => {
        e.preventDefault();
        console.log("login clicked");
        let logUser = this.state.usernameLogin;
        let logPass = this.state.passwordLogin;
        const user = await Moralis.User.logIn(logUser, logPass);
        if (user) {
            this.setState({
                signedIn: true
            });
            console.log(user)
        }
    }


    //wallet login
    handleWalletLogin = async (event) => {
        event.preventDefault();
        const name = event.currentTarget.getAttribute("name");
        let currentUser = Moralis.User.current();
        let user;
        console.log(name);
        try {
            if (!currentUser) {
                if (name === 'WalletConnect') {
                    user = await Moralis.Web3.authenticate({
                        provider: 'walletconnect',
                        mobileLinks: [
                            "rainbow",
                            "metamask",
                            "argent",
                            "trust",
                            "imtoken",
                            "pillar",
                        ]});
                } else {
                    user = await Moralis.Web3.authenticate();
                }
            }
        } catch(error) {
            console.log(error);
        }
        
        
        if (user) {
            const { history } = this.props;
            user.save();
            this.setState({
                signedIn: true
            });
            history.push('/home');
            console.log('wallet login user: ', user);
        }
    }

    
    render() {
        return (
            <React.Fragment>
                <div className = "container" style = {containerStyle}>
                    <div className = "row">
                        <div className='col-md-12'>
                            <Header />
                        </div>
                        <div className='row'>
                            <div className='col-md-9 offset-3'>
                                <WalletSignIn
                                handleWalletLogin={this.handleWalletLogin}
                                />
                            </div>
                            <div className='col-md-2'>
                            </div>
                        </div>
                    </div>
                </div>
                <Geometry />
            </React.Fragment>
                
        )
    }
}


const containerStyle = {
    // fontFamily: 'monospace',
    maxWidth: "960px",
    height: 'fit-content',
}
export default Login;

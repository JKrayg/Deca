import React, { Component } from 'react'
import Header from '../Components/LoginComponenets/Header';
import WalletSignIn from '../Components/LoginComponenets/WalletSignIn';
import Moralis from 'moralis'
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
    handleWalletLogin = async (e) => {
        var user = '';
        e.preventDefault();
        try {
            let currentUser = Moralis.User.current();
            if (!currentUser) {
                console.log(e.target.name);
                console.log("login clicked");
                if (e.target.name === 'walletconnect') {
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
                    user = await Moralis.Web3.authenticate({ provider: e.target.name, chainId: 1 });
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
            <div>
                <div className = "container" style = {containerStyle}>
                    <div className = "row">
                        <div className='col-md-12'>
                            <Header />
                        </div>
                        <div className='row'>
                            <div className='col-md-10 offset-2'>
                                <WalletSignIn
                                handleWalletLogin={this.handleWalletLogin}
                                />
                            </div>
                            <div className='col-md-2'>
                                {/* <button className='btn' onClick={this.getUsernames}>get usernames</button> */}
                            </div>
                            {/* -----Email login/signup forms------[KEEP]
                            <div className='col-md-3 offset-1'>
                            <SignUpForm
                            handleInputChange={this.handleInputChange}
                            handleSignUp={this.handleSignUp}
                            username={this.state.username}
                            email={this.state.email}
                            password={this.state.password}
                            />  
                            <LoginForm
                            handleInputChange={this.handleInputChange}
                            handleLogin={this.handleLogin}
                            usernameLogin={this.state.usernameLogin}
                            passwordLogin={this.state.passwordLogin}
                            handleLogout={this.handleLogout}
                            />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const containerStyle = {
    // fontFamily: 'monospace',
    maxWidth: "960px",
    height: 'fit-content',
}


export default Login;

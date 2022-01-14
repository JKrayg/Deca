import React , { Component } from 'react'
import NavBar from '../Components/AccountComponents/NavBar'
import Moralis from 'moralis';
import { Helmet } from 'react-helmet';
import Header from '../Components/AccountComponents/Header';

class Account extends Component {
    state = {
        id: '',
        username: '',
        walletAddress: '',
        memberJoined: ''
    }

    componentDidMount() {
        this.init();
    }


    init = async () => {
        window.web3 = await Moralis.Web3.enableWeb3();
        const user = await Moralis.User.current();
        const memberJoined = user.createdAt;
        const joined = " " + (memberJoined.getMonth() + 1) + "-" + (memberJoined.getDay() + 2) + "-" + (memberJoined.getFullYear())
        this.setState({
            id: user.id,
            username: user.attributes.username,
            walletAddress: user.attributes.ethAddress,
            memberJoined: joined
        })
    }

    handleLogout = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        const user = await Moralis.User.current();
        await Moralis.User.logOut();
        console.log("User id signed out: " + user.id);
        history.push('/');
    }


    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    changeUsername = async () => {
        const username = this.state.username;
        const regex = new RegExp(/^[A-Za-z][A-Za-z0-9#_-]{3,18}$/);
        if(!regex.test(username)) {
            return alert('error: usernames must start with a letter, have between 3 and 18 characters and cannot contain special characters or spaces')
        }
        const currentUser = await Moralis.User.current();
        currentUser.set("username", username);
        currentUser.save();
    }

    render() {
        return (
            <React.Fragment>
                <Helmet bodyAttributes={{
                    style: backgroundImage}}/>
                <Header
                id={this.state.id}
                username={this.state.username}
                walletAddress={this.state.walletAddress}
                handleLogout={this.handleLogout}
                />
                <div style={containerStyle} className='container'>
                    <NavBar
                    username={this.state.username}
                    handleInputChange={this.handleInputChange}
                    changeUsername={this.changeUsername}
                    walletAddress={this.state.walletAddress}
                    memberJoined={this.state.memberJoined}
                    />
                </div>
            </React.Fragment>
            
        )
    }
}

const containerStyle = {
    border: '3px solid #17cfcf',
    borderRadius: '10px',
    backgroundColor: '#17cfcf54',
    padding: '20px 40px',
    marginTop: "30px",
    maxWidth: "960px"
}

const backgroundImage =
'background-image : url(https://i.imgur.com/Saepkjx.png);'+
'background-size: 267.75px 388.5px;'

export default Account;
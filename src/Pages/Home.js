import React, { Component } from 'react'
import Header from '../Components/HomeComponents/Header';
import Moralis from 'moralis';
import Dashboard from '../Components/HomeComponents/Dashboard';
// import Geometry from '../Components/HomeComponents/Geometry';
import { Helmet } from 'react-helmet';
// import $ from 'jquery';
class Home extends Component {
    state = {
        id: '',
        username: '',
        walletAddress: '',
        memberJoined: '',
        nftAddress: '',
        owner: '',
        nfts: []
    }

    componentDidMount() {
        this.init();
    }


    //input listener
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };


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

    //need masterKey in cloud function
    getUsernames = async () => {
        const users = Moralis.Object("User");
        const query = new Moralis.Query(users);
        const results = await query.find({ useMasterKey: true });
        console.log('usernames:', results);
    }


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


    // getEthAddress = async () => {
    //     const currentUser = await Moralis.User.current();
    //     const address = currentUser.attributes.ethAddress;
    //     this.setState({
    //         id: user.id,
    //         username: user.attributes.username,
    //         walletAddress: user.attributes.accounts[0]
    //     })
    // }


    
    render() {
        return (
            <div>
                <Helmet bodyAttributes={{
                    style: backgroundImage}}/>
                <Header
                id={this.state.id}
                username={this.state.username}
                walletAddress={this.state.walletAddress}
                handleLogout={this.handleLogout}
                />
                <div style={containerStyle} className='container'>
                    <Dashboard />
                </div>
                {/* <Geometry /> */}
            </div>
        )
    }
}

const containerStyle = {
    marginTop: "40px",
    maxWidth: "960px"
}

const backgroundImage =
'background-image : url(https://i.imgur.com/Saepkjx.png);'+
'background-size: 267.75px 388.5px;'+
'background-position-y: -250%'
export default Home;

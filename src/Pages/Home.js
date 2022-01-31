import React, { Component } from 'react'
import Header from '../Components/HomeComponents/Header';
import Geometry from '../Components/HomeComponents/Geometry';
import Moralis from 'moralis';
import Dashboard from '../Components/HomeComponents/Dashboard';
// import Geometry from '../Components/HomeComponents/Geometry';
// import { Helmet } from 'react-helmet';
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

    // componentWillMount = () => {
    //     console.log("hello")
    //     document.body.style.content = "";
    //     document.body.style.backgroundImage =  "url(https://i.imgur.com/5Kty486.png)";
    //     document.body.style.backgroundRepeat = "no-repeat";
    //     document.body.style.backgroundAttachment = "fixed";
    //     document.body.style.backgroundSize = "2553.6px 1436.4px";
    //     document.body.style.backgroundPosition = "center";
    // }

    componentDidMount = () => {
        this.init();
        console.log("hello")
        document.body.style.content = "";
        document.body.style.backgroundImage =  "url(https://i.imgur.com/e13rAvS.png)";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "2553.6px 1436.4px";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundPositionX = "56%";
        document.body.style.backgroundPositionY = "52%";
    }

    componentWillUnmount = () => {
        console.log("hello")
        document.body.style.content = null;
        document.body.style.backgroundImage =  null;
        document.body.style.backgroundRepeat = null;
        document.body.style.backgroundAttachment = null;
        document.body.style.backgroundSize = null;
        document.body.style.backgroundPosition = null;
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
    
    render() {
        return (
            <React.Fragment>
                <Header
                id={this.state.id}
                username={this.state.username}
                walletAddress={this.state.walletAddress}
                handleLogout={this.handleLogout}
                />
                <div style={containerStyle} className='container'>
                    <Dashboard />
                </div>
                <Geometry />
            </React.Fragment>
        )
    }
}

const containerStyle = {
    marginTop: "40px",
    maxWidth: "960px"
}
export default Home;

import React, { Component } from 'react'
import Header from '../Components/HomeComponents/Header';
import NavBar from '../Components/HomeComponents/NavBar'
import Moralis from 'moralis';
import Geometry from '../Components/HomeComponents/Geometry';
// import $ from 'jquery';
export class Home extends Component {
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


    // NEED IPFS. GO INTO "token_uri"
    getNFTs = async () => {
        const address = this.state.nftAddress;
        let owner;
        const options = { chain: 'matic', address: address };
        const ethNFTs = await Moralis.Web3API.account.getNFTs(options);
        const result = ethNFTs.result;
        console.log(result);
        let tokens = [];
        for (let i = 0; i < result.length; i++) {
            owner = result[i].owner_of;
            const metadata = result[i].metadata;
            const parse = JSON.parse(metadata)
            console.log(metadata)
            if (metadata === null) {
                console.log("Element " + i + " has no data");
            } else {
                tokens.push(parse)
                
            }
        }
        this.setState({
            owner: owner,
            nfts: tokens
        })
        console.log(this.state.nfts)
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
                    getNFTs={this.getNFTs}
                    nftAddress={this.state.nftAddress}
                    nfts={this.state.nfts}
                    owner={this.state.owner}
                    />
                </div>
                <Geometry />
            </div>
        )
    }
}

const containerStyle = {
    marginTop: "40px",
    maxWidth: "960px"
}

export default Home;

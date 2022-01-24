import React, { Component } from 'react';
import SearchBar from '../Components/SearchComponents/SearchBar';
import Moralis from 'moralis';
import Header from '../Components/SearchComponents/Header';


class Search extends Component {
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

    //input listener
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    getNFTs = async () => {
        const address = this.state.nftAddress;
        let owner;
        const options = { chain: 'matic', address: address };
        const ethNFTs = await Moralis.Web3API.account.getNFTs(options);
        const result = ethNFTs.result;
        let tokens = [];
        console.log(result);
        if (result.length <= 10) {
            for (let i = 0; i < result.length; i++) {
                owner = result[i].owner_of;
                this.setState({
                    owner: owner
                })
                const tokenURI = result[i].token_uri;

                fetch(tokenURI, {method: 'GET'})
                .then(response => response.json())
                .then(data => {
                console.log(data);
                if (data === null) {
                    console.log("Element " + i + " has no data");
                    } else {
                        tokens.push(data)
                        console.log("tokens", tokens)
                        this.setState({
                            nfts: tokens
                        })
                        
                    }
                    
                })
            }
        }
        return 0;
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
                    <SearchBar
                    handleInputChange={this.handleInputChange}
                    getNFTs={this.getNFTs}
                    nftAddress={this.state.nftAddress}
                    nfts={this.state.nfts}
                    owner={this.state.owner}
                    />
                </div>  
            </React.Fragment>
            
        )
    }
}


const containerStyle = {
    // fontFamily: 'monospace',
    maxWidth: "960px",
    height: 'fit-content',
}
export default Search;
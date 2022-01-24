import React, { Component } from 'react';
import Moralis from 'moralis';
// import Helmet from 'react-helmet';
import Header from '../Components/SearchComponents/Header';
import NFTcontainer from '../Components/WalletComponents/NFTcontainer';


class Wallet extends Component {
    state = {
        id: '',
        username: '',
        walletAddress: '',
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
        this.setState({
            id: user.id,
            username: user.attributes.username,
            walletAddress: user.attributes.ethAddress
        })
        this.getNFTs();
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
        const address = this.state.walletAddress;
        let owner;
        const options = { chain: 'matic', address: address };
        const ethNFTs = await Moralis.Web3API.account.getNFTs(options);
        const result = ethNFTs.result;
        let tokens = [];
        console.log(result);
        if (result.length <= 20) {
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

    sendNFT = async () => {
        console.log("click")
    }


    render() {
        return (
            <React.Fragment>
              {/* <Helmet bodyAttributes={{style: backgroundImage}} /> */}
                <Header
                id={this.state.id}
                username={this.state.username}
                walletAddress={this.state.walletAddress}
                handleLogout={this.handleLogout}
                />
                <div style={containerStyle} className='container'>
                    <NFTcontainer
                    handleInputChange={this.handleInputChange}
                    getNFTs={this.getNFTs}
                    nftAddress={this.state.nftAddress}
                    nfts={this.state.nfts}
                    owner={this.state.owner}
                    sendNFT={this.sendNFT}
                    />
                </div>  
            </React.Fragment>
            
        )
    }
}


const containerStyle = {
    maxWidth: "960px",
    height: 'fit-content',
}
export default Wallet;
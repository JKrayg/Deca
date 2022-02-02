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

    componentDidMount = () => {
        this.init();
        console.log("hello")
        document.body.style.content = "";
        document.body.style.backgroundImage =  "url(https://i.imgur.com/Uan9xOT.png)";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundColor = "none";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "1920px 1080";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundPositionX = "56%";
        document.body.style.backgroundPositionY = "52%";
    }

    componentWillUnmount = () => {
        console.log("hello")
        document.body.style.backgroundColor = null;
        document.body.style.content = null;
        document.body.style.backgroundImage =  null;
        document.body.style.backgroundRepeat = null;
        document.body.style.backgroundAttachment = null;
        document.body.style.backgroundSize = null;
        document.body.style.backgroundPosition = null;
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
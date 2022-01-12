import React, { Component } from 'react';
import SearchBar from '../Components/SearchComponents/SearchBar';
import Moralis from 'moralis';


export default class Search extends Component {
    state = {
        nftAddress: '',
        owner: '',
        nfts: []
    }

    componentDidMount = () => {
        console.log("search mounted")
    }

    //input listener
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

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


    render() {
        return (
            <div>
                <SearchBar
                handleInputChange={this.handleInputChange}
                getNFTs={this.getNFTs}
                nftAddress={this.state.nftAddress}
                nfts={this.state.nfts}
                owner={this.state.owner}
                />
            </div>
        )
    }
}

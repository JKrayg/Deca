import React from 'react'
import './style.css'
import { v4 as uuidv4 } from 'uuid';

const metamaskStyle = {
    backgroundColor: 'rgb(255, 164, 45)'
}

const walletConnectStyle = {
    backgroundColor: 'rgb(24, 150, 253)'
}

const testWalletStyle = {
    backgroundColor: 'red'
}

function WalletSignIn(props) {
    const wallets = [
        {
            wallet: 'MetaMask',
            style: metamaskStyle,
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png"
        },
        {
            wallet: 'WalletConnect',
            style: walletConnectStyle,
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdcentlife.io%2Fwp-content%2Fuploads%2F2020%2F09%2Fa5169900-c66c-11e9-8592-33c7334dfd6d.png&f=1&nofb=1"
        },
        {
            wallet: 'testWallet',
            style: testWalletStyle,
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/10-gon_rhombic_dissection7-size2.svg/150px-10-gon_rhombic_dissection7-size2.svg.png"
        }]


    return (
        <React.Fragment>
            {wallets.map(results => (
                <div key={uuidv4()}>
                    <button
                    value="submit"
                    name={results.wallet}
                    style = {results.style}
                    id="walletBtns" onClick={props.handleWalletLogin}
                    className="btn btn-primary">
                        <img id="walletImg"
                        alt={results.name}
                        src={results.img}/><span id = 'walletName'>{results.wallet}</span></button>
                </div>
            ))}
             
        </React.Fragment>
        
    )
}

export default WalletSignIn;


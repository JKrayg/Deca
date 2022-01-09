import React from 'react'
import "./style.css"
import { v4 as uuidv4 } from 'uuid';
// import Moralis from 'moralis';

function NavBar(props) {
    return (
        <React.Fragment>
            <div className = "row">
                <div id='nav' className = "col-md-12">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                type="button" role="tab" aria-controls="profile" aria-selected="true">Profile</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="wallet-tab" data-bs-toggle="tab" data-bs-target="#wallet"
                                type="button" role="tab" aria-controls="wallet" aria-selected="false">Wallet</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="transactions-tab" data-bs-toggle="tab" data-bs-target="#transactions"
                                type="button" role="tab" aria-controls="transactions" aria-selected="false">Tx History</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="assets-tab" data-bs-toggle="tab" data-bs-target="#assets"
                                type="button" role="tab" aria-controls="assets" aria-selected="false">Assets</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade  show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className="mb-3">
                                        <label style={{fontSize: '14px', marginTop: '20px'}}
                                            htmlFor="createUsername" className="form-label">Change your username</label>
                                        <input
                                        type="text"
                                        name='username'
                                        value={props.username}
                                        onChange={props.handleInputChange}
                                        className="form-control"
                                        id="createUsername"
                                        placeholder="create a username"
                                        />
                                    </div>
                                </div>    
                                <div className='col-md-2'>
                                    <button type='submit' onClick={props.changeUsername}
                                            id="changeUsernameBtn" className="btn btn-success">Change</button>
                                </div>
                                <div className='col-md-4 offset-2'>
                                    <p style={{position: 'relative', top: '10%', float: 'right'}}>Joined:<span>{props.memberJoined}</span></p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <h4 style={{margin: '10px 0px',  fontSize: '14px'}}>Ethereum wallet address:</h4>
                                    <h5 style={{fontWeight: 'bold'}}>{props.walletAddress}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="wallet" role="tabpanel" aria-labelledby="home-tab">wallets</div>
                        <div className="tab-pane fade" id="transactions" role="tabpanel" aria-labelledby="profile-tab">transactions</div>
                        <div className="tab-pane fade" id="assets" role="tabpanel" aria-labelledby="contact-tab">
                            <div className='row'>
                                <div className='col-md-8'>
                                    {props.nfts.map(nft => (
                                        <div key={uuidv4()} id='nftCard' className="card">
                                            <img src={nft.image} className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title">{nft.name}</h5>
                                                <p style={{marginBottom: '10px'}} className="card-text">Owner: {props.owner}</p>
                                                <a style={{color: 'lightslategray', marginTop: '10px', textDecoration: 'none'}}
                                                    href='#' className='modal-link' id='enlarge'>Enlarge🔎</a>
                                                <a style={{marginTop: '10px'}} href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='col-md-4'>
                                    <div className="mb-3">
                                        <label style={{fontSize: '14px'}}
                                            htmlFor="createUsername" className="form-label">Get NFT's from an MATIC wallet</label>
                                        <input
                                        type="text"
                                        name='nftAddress'
                                        value={props.nftAddress}
                                        onChange={props.handleInputChange}
                                        className="form-control"
                                        id="ethAddressIn"
                                        placeholder="wallet address"
                                        />
                                        <button style={{float: 'right', marginTop: '5px'}} type='submit' onClick={props.getNFTs}
                                            id="changeUsernameBtn" className="btn btn-success">get</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default NavBar;

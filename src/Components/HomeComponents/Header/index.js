import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

function Header(props) { 
    return (
        <React.Fragment>
            <div id='home_head' className = "head"> 
                <div className = "row">
                    <div className = "col-md-3">
                        <div>
                            <Link alt='Decca' id='home_name' to = "/home"
                            className= {window.location.pathname === "/home" ? "nav-link active" : "nav-link"}>Deca</Link>
                        </div>
                    </div>
                    <div id='navBar' className='col-md-5 offset-1'>
                        <Link id='navBtns' to = "/Wallet"
                            className= {window.location.pathname === "/Wallet" ? "nav-link active" : "nav-link"}>Wallet</Link>
                        <Link id='navBtns' to = "/Search"
                            className= {window.location.pathname === "/Search" ? "nav-link active" : "nav-link"}>Search</Link>
                        <Link id='navBtns' to = "/Transactions"
                            className= {window.location.pathname === "/Transactions" ? "nav-link active" : "nav-link"}>Transactions</Link>
                        <Link id='navBtns' to = "/Account"
                            className= {window.location.pathname === "/Account" ? "nav-link active" : "nav-link"}>Account</Link>
                    </div>
                    <div className = "col-md-3">
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3 style={{float: 'right', padding: '10px'}}>Welcome {props.username}</h3>
                            </div>
                            <div className='col-md-12'>
                            <div id='logoutBtnGroup' className="btn-group">
                                <button id='logoutToggle' className="btn btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <button type='dropdown' className="dropdown-menu"
                                    onClick={props.handleLogout} id='logoutBtn'>Log out</button>
                            </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                {/*
                <div>
                    <p>id::: { props.id }</p>
                    <p>username::: { props.username }</p>
                    <p>wallet address::: { props.walletAddress }</p>
                </div>
                */}
            </div>
                
            
        </React.Fragment>
    )
}
export default Header;

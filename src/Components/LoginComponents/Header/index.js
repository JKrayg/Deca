import React from 'react'
import "./style.css"

function Header() {

    return (
        <React.Fragment>
            <div id='login_head' className = "row">
                {/* <div className = "col-md-12">
                    <h1 id = 'login_name'>Deca</h1>
                </div> */}
                <div className = "col-md-12">
                <h1 style={{fontSize: '2.5rem', fontFamily: 'monospace', marginBottom: '20px'}}>- Sign in with your wallet</h1>
                    {/**Nav Links */}
                    <div></div>
                </div>
            </div>
            
        </React.Fragment>
    )
}
export default Header;

import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Dashboard() {
  return (
    <div id="navBar" className="row">
      <div className="col-md-12">
        <div id="navBtns">
          <Link
            id="walletLink"
            to="/Wallet"
            className={
              window.location.pathname === '/Wallet'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Wallet
          </Link>
        </div>
        <div id="navBtns">
          <Link
            id="searchLink"
            to="/Search"
            className={
              window.location.pathname === '/Search'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Search
          </Link>
        </div>
        <div id="navBtns">
          <Link
            id="txLink"
            to="/Transactions"
            className={
              window.location.pathname === '/Transactions'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Transactions
          </Link>
        </div>
        <div id="navBtns">
          <Link
            id="accountLink"
            to="/Account"
            className={
              window.location.pathname === '/Account'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

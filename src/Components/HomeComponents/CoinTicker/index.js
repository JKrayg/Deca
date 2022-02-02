import React from 'react'
import './style.css'
import { v4 as uuidv4 } from 'uuid'

function CoinTicker(props) {
  return (
    <React.Fragment>
      <div id="con2" className="row">
        <div id="coinCon2" className="col-md-11">
          <div id="con" className="row">
              {props.coins.map((coin) => (
                <div key={uuidv4()} id="coinCard" className="col-md-3">
                  <img src={coin.image.large} id="coinLogo" alt="..." />
                  <h1 id="coinId"> {coin.localization.en} </h1>
                  <p id="coinPrice">${coin.market_data.current_price.usd} </p>
                </div>
              ))}
            </div>
        </div>
        <div className="col-md-1">
          <button className="btn" id="addBtn">
            +
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CoinTicker

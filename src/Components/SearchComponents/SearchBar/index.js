import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import './style.css'

function SearchBar(props) {
  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          {props.nfts.map((nft) => (
            <div key={uuidv4()} id="nftCard" className="card">
              <img
                src={nft.image}
                id="nft-image"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{nft.name}</h5>
                <p style={{ marginBottom: '10px' }} className="card-text">
                  Owner: {props.owner}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <label
              style={{ fontSize: '14px' }}
              htmlFor="createUsername"
              className="form-label"
            >
              Get NFT's from an MATIC wallet
            </label>
            <input
              type="text"
              name="nftAddress"
              value={props.nftAddress}
              onChange={props.handleInputChange}
              className="form-control"
              id="ethAddressIn"
              placeholder="wallet address"
            />
            <button
              style={{ float: 'right', marginTop: '5px' }}
              type="submit"
              onClick={props.getNFTs}
              id="changeUsernameBtn"
              className="btn btn-success"
            >
              get
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;

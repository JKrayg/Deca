import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import './style.css'

function NFTcontainer(props) {
    const toIPFS = (image) => {
        image = image.replace(':', '');
        image = 'https://ipfs.io/' + image;
        return image;
      }
  return (
    <React.Fragment>
      <div className="row">
        <div id='cardCon' className="col-md-12">
        {props.nfts.length === 0 ? <div style={{textAlign: 'center'}}>You don't have any NFTs yet</div>
        : props.nfts.map((nft) => (
            <div key={uuidv4()} id="nftCard" className="card">
              <img
                src={
                  !nft.image.includes('https') ? toIPFS(nft.image) : nft.image
                }
                id="nft-image"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{nft.name}</h5>
                <p style={{ marginBottom: '10px' }} className="card-text">
                  Owner: {props.owner}
                </p>
                <button type="button" onClick={props.sendNFT} className="btn btn-info">Send</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default NFTcontainer;
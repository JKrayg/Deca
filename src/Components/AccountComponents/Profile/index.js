import React from 'react'
import './style.css'
// import Moralis from 'moralis';

function Profile(props) {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label
              style={{ fontSize: '14px', marginTop: '20px' }}
              htmlFor="createUsername"
              className="form-label"
            >
              Change your username
            </label>
            <input
              type="text"
              name="username"
              value={props.username}
              onChange={props.handleInputChange}
              className="form-control"
              id="createUsername"
              placeholder="create a username"
            />
          </div>
        </div>
        <div className="col-md-2">
          <button
            type="submit"
            onClick={props.changeUsername}
            id="changeUsernameBtn"
            className="btn btn-success"
          >
            Change
          </button>
        </div>
        <div className="col-md-4 offset-2">
          <p style={{ position: 'relative', top: '10%', float: 'right' }}>
            Joined:<span>{props.memberJoined}</span>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4 style={{ margin: '10px 0px', fontSize: '14px' }}>
            Ethereum wallet address:
          </h4>
          <h5 style={{ fontWeight: 'bold' }}>{props.walletAddress}</h5>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Profile;

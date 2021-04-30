import React, { Component } from "react";
import "./Token.css";

class TokenBlock extends React.Component {
  //tokenblock to show how many token does the user has
  render() {
    return (
      <div>
        <a className='token_block_frame'>
          <a className='coin_frame'>
            <i className='fas fa-dollar-sign'></i>
          </a>
          <b>{this.props.token}</b>
        </a>
      </div>
    );
  }
}

export default TokenBlock;

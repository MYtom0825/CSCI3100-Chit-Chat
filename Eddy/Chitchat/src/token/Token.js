import React, { Component } from "react";
import "./Token.css";

class TokenBlock extends React.Component {
  render() {
    return (
      <div>
        <a className='token_block_frame'>
          <a className='coin_frame'>
            <i class='fas fa-dollar-sign'></i>
          </a>
          <b>{this.props.token}</b>
        </a>
      </div>
    );
  }
}

export default TokenBlock;

import React, { Component } from "react";
import "./Name_card.css";

//import Component

class Name_card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className='namecard_card'>
          <img className='namecard_card_img' src='https://placeimg.com/400/400/tech' alt='John' width='270' height='270'></img>
          <h1 className='namecard_name'>ChitChat</h1>
          <h3 className='namecard_info'>Welcome and enjoy your Chat</h3>
          <h3 className='namecard_info'>Please wait if your partner hasn't entered the room!</h3>
          <h3 className='namecard_info'>Partner's Answer to the Pop-up Quiz:</h3>
          {this.props.partnerresponse.userResponse ? this.props.partnerresponse.userResponse.map((answer) => <li className='namecard_info'>{answer}</li>) : ""}
          <div></div>
        </div>
      </div>
    );
  }
}

export default Name_card;

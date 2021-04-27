import React, { Component } from "react";
import "./Name_card.css";
import Name_card_Details from "./namecarddetails";

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
          <h3 className='namecard_info'>Belows are your partner profile</h3>
          <div>
            <Name_card_Details partnerresponse={this.props.partnerresponse} partnerinfo={this.props.partnerInfo.partnerinfo} />
          </div>
        </div>
      </div>
    );
  }
}

export default Name_card;

import React, { Component } from "react";
import "./Name_card.css";

//import Component

class Name_card extends React.Component {
  render() {
    return (
      <div>
        <div className="namecard_card">
          <img
            className="namecard_card_img"
            src="https://placeimg.com/400/400/tech"
            alt="John"
            width="270"
            height="270"
          ></img>
          <h1 className="namecard_name">Tom Tom</h1>
          <h3 className="namecard_info">Basic Info:</h3>
          <p className="namecard_info">Hi</p>
          <h3 className="namecard_info">Common Interest:</h3>
          <p className="namecard_info">Hi</p>
          <h3 className="namecard_info">Answer to the Pop-up Quiz:</h3>
          <li className="namecard_info">Hi</li>
          <div></div>
          <p>
            <cardbutton>Contact</cardbutton>
          </p>
        </div>
      </div>
    );
  }
}

export default Name_card;

import "./namecarddetails.css";
import React, { Component } from "react";

class Name_card_Details extends React.Component {
  //Name_card_Details show partner information and partner's answer to pop up quiz
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='name_card_holder'>
        <div className='profile_row'>
          <p style={{ fontSize: "10pt" }} className='profile_colm25'>
            Name:{" "}
          </p>
          <p style={{ fontSize: "10pt" }} className='profile_colm75'>
            {" "}
            {this.props.partnerinfo.nickName}
          </p>
        </div>
        <div className='profile_row'>
          <p style={{ fontSize: "10pt" }} className='profile_colm25'>
            Gender:{" "}
          </p>
          <p style={{ fontSize: "10pt" }} className='profile_colm75'>
            {" "}
            {this.props.partnerinfo.gender}
          </p>
        </div>
        <div className='profile_row'>
          <p style={{ fontSize: "10pt" }} className='profile_colm25'>
            Description:{" "}
          </p>
          <p style={{ fontSize: "10pt" }} className='profile_colm75'>
            {" "}
            {this.props.partnerinfo.description}
          </p>
        </div>
        <div className='profile_row'>
          <p style={{ fontSize: "10pt" }} className='profile_colm25'>
            Faculty:{" "}
          </p>
          <p style={{ fontSize: "10pt" }} className='profile_colm75'>
            {" "}
            {this.props.partnerinfo.faculty}
          </p>
        </div>
        <div className='profile_row'>
          <p style={{ fontSize: "10pt" }} className='profile_colm25'>
            University:{" "}
          </p>
          <p style={{ fontSize: "10pt" }} className='profile_colm75'>
            {" "}
            {this.props.partnerinfo.university}
          </p>
        </div>
        <div className='profile_row'>
          <p style={{ fontSize: "10pt" }} className='profile_colm25'>
            Years:{" "}
          </p>
          <p style={{ fontSize: "10pt" }} className='profile_colm75'>
            {" "}
            {this.props.partnerinfo.year}
          </p>
        </div>
        <div className='profile_row'>
          <p style={{ fontSize: "10pt" }} className='profile_colm25'>
            Status:{" "}
          </p>
          <p style={{ fontSize: "10pt" }} className='profile_colm75'>
            {" "}
            {this.props.partnerinfo.status}
          </p>
        </div>
        <div className='profile_row'>
          <p className='profile_colm25' style={{ fontSize: "10pt", height: this.props.partnerinfo.interest == null ? "10vh" : this.props.partnerinfo.interest.length * 30 }}>
            Interests:{" "}
          </p>
          {this.props.partnerinfo.interest.map(function (interest) {
            return (
              <p style={{ fontSize: "10pt" }} className='profile_colm75'>
                {interest}
              </p>
            );
          })}
        </div>
        <div className='profile_row'>
          <p style={{ fontSize: "10pt", height: this.props.partnerresponse.userResponse == undefined ? "10vh" : this.props.partnerresponse.userResponse.length * 40 }} className='profile_colm25'>
            Partner's Answer:{" "}
          </p>
          {this.props.partnerresponse.userResponse
            ? this.props.partnerresponse.userResponse.map((answer) => (
                <p style={{ fontSize: "10pt" }} className='profile_colm75'>
                  {answer}
                </p>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default Name_card_Details;

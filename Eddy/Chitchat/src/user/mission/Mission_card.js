import React, { Component } from "react";
import "./Mission.css";

//import Component

class Mission_card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <td className='mission_title'>{this.props.name}</td>
        <td>{this.props.content}</td>

        <td>
          {this.props.finished.includes(this.props.index) ? (
            <button disabled>{this.props.Token} tokens have been got</button>
          ) : (
            <button
              onClick={(event) => {
                this.props.AddToken(this.props.Token);
                this.props.FinishedMission(this.props.index);
              }}
            >
              GO! {this.props.Token} tokens can be got
            </button>
          )}
        </td>

        {this.props.finished.includes(this.props.index) ? (
          <td>
            <span className='checkmark'>
              <div className='checkmark_circle'></div>
              <div className='checkmark_stem'></div>
              <div className='checkmark_kick'></div>
            </span>
          </td>
        ) : (
          <td>
            <p></p>
          </td>
        )}
      </div> //finished is a label
    );
  }
}
/*
const Mission_card = (props) => {
 

    return(
        <div>
            <td>{props.name}</td>
            <td>{props.content}</td>
            <td><a href={props.link} >GO!(Yet designed)</a></td>
             
        </div>
        
    );

};
*/

export default Mission_card;

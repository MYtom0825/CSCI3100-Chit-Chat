import React, { Component } from "react";
import "./Mission.css";

//import Component

class Mission_card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var finished;
    return (
      <div>
        <td>{this.props.name}</td>
        <td>{this.props.content}</td>
        <td>
          <a href={this.props.link}>GO!(Yet designed)</a>
        </td>
        {this.props.finished.includes(this.props.index) ? (
          <td>
            <p>finished</p>
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

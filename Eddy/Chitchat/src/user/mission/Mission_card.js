import React, { Component } from "react";
import "./Mission.css";

//import Component

class Mission_card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedMission: this.props.finished,
    };
  }
  render() {
    let finished;
    if (this.props.finished.includes(this.props.index)) {
      finished = (
        <td>
          <p>finished</p>
        </td>
      );
    } else {
      finished = (
        <td>
          <p></p>
        </td>
      );
    }
    return (
      <div>
        <td>{this.props.name}</td>
        <td>{this.props.content}</td>
        <td>
          <a href={this.props.link}>GO!(Yet designed)</a>
        </td>
        {finished}
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

import React, { Component } from "react";
import "./Mission.css";

//import Component

class Mission_card extends React.Component {
  //to output mission details
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <td className='mission_title'>{this.props.name}</td>
        <td>{this.props.content}</td>

        <td>
          {this.props.finished.includes(this.props.index) ? ( //button will be disabled if mission has already been finished so user cannot redo mission
            <button disabled>{this.props.Token} tokens have been got</button>
          ) : (
            <button
              onClick={(event) => {
                //button to finish mission, token will be added and finished mission will be updated in database
                this.props.AddToken(this.props.Token);
                this.props.FinishedMission(this.props.index);
              }}
            >
              GO! {this.props.Token} tokens can be got
            </button>
          )}
        </td>

        {this.props.finished.includes(this.props.index) ? ( //finished is an array that includes mission index of user finished mission
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
      </div>
    );
  }
}

export default Mission_card;

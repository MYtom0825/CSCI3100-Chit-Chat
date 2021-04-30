import React, { useState, Component } from "react";
import "./Mission.css";
import $ from "jquery";
//import Component
import Calendar from "react-calendar";
import "./Calendar.css";
import Mission_card from "./Mission_card";
import icon from "./Mission-icon.png";

class Mission extends React.Component {
  //Mission component is for mission feature which includes a calendar and mission list
  constructor(props) {
    super(props);
    this.state = {
      missionFinished: [],
    };
  }
  componentDidMount() {
    //we get mission that has been finished by the user from the database
    $.get("http://localhost:5000/mission", { username: this.props.user.name })
      .done((res) => {
        var finished = res.missionFinishedID;
        this.setState({ missionFinished: finished });
      })
      .fail(() => {
        this.setState({ missionFinished: [0, 1, 2, 3] }); //we assume mission are all finished when the server is down so that user can not re-do missions
      });
  }
  componentWillUnmount() {
    //when user switch to other feature, update the finished mission array in the database
    $.post("http://localhost:5000/mission", { username: this.props.user.name, missionFinished: this.state.missionFinished }).always(() => {});
  }
  FinishedMission = (index) => {
    //add mission id to missionFinished state when user finishes the mission so user cannot redo mission
    var finished = this.state.missionFinished;
    finished.push(index);
    this.setState({ missionFinished: finished });
  };
  render() {
    const mission_list = [
      //these are trial mission which includes token that user may get
      { Name: "Daily Login", Content: "Log in daily", Link: "", index: 0, token: 5 }, //0
      { Name: "Hello", Content: "You are welcome", Link: "", index: 1, token: 3 }, //1
      { Name: "Create Ice-breaking Quiz", Content: "Think of some question for the Ice breaking quiz!", Link: "", index: 2, token: 4 }, //2
      { Name: "Likes", Content: "How many you got likes from others?", Link: "", index: 3, token: 5 }, //3
    ];
    //mission feature contains two part, calendar (on the left) imported from react-calendar, mission card (on the right), calendar can be modified to show days that user has logged in later
    return (
      <div>
        <div className='mission_column' type='colm_35'>
          <text_title type='mission'>DAILY LOGIN</text_title>
          <Calendar locale='en-US' />
        </div>
        <div className='mission_column' type='colm_65'>
          <div className='mission_row'>
            <img src={icon} alt='' className='mission_icon'></img>
            <text_title1 type='mission'>MISSION LIST</text_title1>
          </div>
          <div className='mission_card'>
            <div className='mission_table'>
              <div className='mission_tr'>
                {mission_list.map((mission_list) => (
                  <div className='mission_tr'>
                    {
                      //Mission Details are outputed and generated with Mission_card component for each mission
                    }
                    <Mission_card
                      FinishedMission={this.FinishedMission}
                      name={mission_list.Name}
                      content={mission_list.Content}
                      link={mission_list.Link}
                      finished={this.state.missionFinished}
                      index={mission_list.index}
                      AddToken={this.props.AddToken}
                      Token={mission_list.token}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Mission;

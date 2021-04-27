import React, { useState, Component } from "react";
import "./Mission.css";
import $ from "jquery";
//import Component
import Calendar from "react-calendar";
import "./Calendar.css";
import Mission_card from "./Mission_card";
import icon from "./Mission-icon.png";

class Mission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      missionFinished: [],
    };
  }
  componentDidMount() {
    $.get("http://localhost:5000/mission", { username: this.props.user.name })
      .done((res) => {
        var finished = res.missionFinishedID;
        this.setState({ missionFinished: finished });
      })
      .fail(() => {
        this.setState({ missionFinished: [1, 2] });
      });
  }
  componentWillUnmount() {
    $.post("http://localhost:5000/mission", { username: this.props.user.name, missionFinished: this.state.missionFinished }).always(() => {
      console.log("finished");
    });
  }
  FinishedMission = (index) => {
    var finished = this.state.missionFinished;
    finished.push(index);
    this.setState({ missionFinished: finished });
    console.log(finished);
  };
  render() {
    const mission_list = [
      { Name: "Daily Login", Content: "Log in daily", Link: "", index: 0, token: 5 }, //0
      { Name: "Hello", Content: "You are welcome", Link: "", index: 1, token: 3 }, //1
      { Name: "Create Ice-breaking Quiz", Content: "Think of some question for the Ice breaking quiz!", Link: "", index: 2, token: 4 }, //2
      { Name: "Likes", Content: "How many you got likes from others?", Link: "", index: 3, token: 5 }, //3
    ];
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
/*
const Mission = () => {
    
   
    const mission_list = [{Name:"Create Ice-breaking Quiz", Content:"Think of some question for the Ice breaking quiz!",Link:"./home.html" },
                        {Name:"Hello", Content:"You are welcome", Link:"http://fb.com"},
                       ];
   
    

    return(
        <div >
            <div className="column">                                     
                <text_title>DAILY LOGIN</text_title>   
                <Calendar locale="en-US"/>  
            </div>
            <div className="column">
                <div className="mission_card">
                    <div className="table">
                
                        <div className="tr">
                            {mission_list.map((mission_list)=>(
                                <Mission_card name={mission_list.Name} content={mission_list.Content} link={mission_list.Link}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );

};
*/

export default Mission;

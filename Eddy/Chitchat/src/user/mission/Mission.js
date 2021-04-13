import React, { useState, Component } from "react";
import "./Mission.css";
import axios from "axios";
//import Component
import Calendar from "react-calendar";
import "./Calendar.css";
import Mission_card from "./Mission_card";

class Mission extends React.Component {
  constructor() {
    super();
    this.state = {
      missionFinished: [0, 1],
    };
  }
  componentDidMount() {
    /*axios
      .get("/mission")
      .then((response) => response.data)
      .then((data) => {
        //a sorted array of missionID must be returned
        this.setState({ missionFinished: data.missionFinishedID });
        console.log(this.state.missionFinished);
      });*/
  }

  render() {
    const mission_list = [
      { Name: "Daily Login", Content: "Log in daily", Link: "", index: 0 }, //0
      { Name: "Hello", Content: "You are welcome", Link: "http://fb.com", index: 1 }, //1
      { Name: "Create Ice-breaking Quiz", Content: "Think of some question for the Ice breaking quiz!", Link: "./home.html", index: 2 }, //2
      { Name: "Likes", Content: "How many you got likes from others?", Link: "", index: 3 }, //3
    ];
    return (
      <div>
        <div className='column'>
          <text_title>DAILY LOGIN</text_title>
          <Calendar locale='en-US' />
        </div>
        <div className='column'>
          <text_title1>MISSION LIST</text_title1>
          <div className='mission_card'>
            <div className='table'>
              <div className='tr'>
                {mission_list.map((mission_list) => (
                  <div className='tr'>
                    <Mission_card name={mission_list.Name} content={mission_list.Content} link={mission_list.Link} finished={this.state.missionFinished} index={mission_list.index} />
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

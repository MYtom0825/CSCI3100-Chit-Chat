import React, {useState, Component} from 'react';
import "./Mission.css";

//import Component
import Calendar from 'react-calendar';
import'react-calendar/dist/Calendar.css';
import Mission_card from './Mission_card';


class Mission extends React.Component{
    
    render(){
        const mission_list = [
                        {Name:"Create Ice-breaking Quiz", Content:"Think of some question for the Ice breaking quiz!",Link:"./home.html" },
                        {Name:"Hello", Content:"You are welcome", Link:"http://fb.com"},
                       ];
        return(
            
            <div >
                <div className="column">                            
                    <text_title>DAILY LOGIN</text_title>   
                    <Calendar locale="en-US"/>
                    
                </div>
                <div className="column">
                    <text_title1>MISSION LIST</text_title1>
                    <div className="mission_card">
                        <div className="table">
                            <div className="tr">
                                {mission_list.map((mission_list)=>(
                                    <div className="tr">
                                        <Mission_card name={mission_list.Name} content={mission_list.Content} link={mission_list.Link}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
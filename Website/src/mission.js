import React from 'react';
import "./App.css";

//import Component
import Calendar from 'react-calendar';
import'react-calendar/dist/Calendar.css';

const Mission = () => {
 

    return(
        <div>
            <div className="calender_block">
                <div >
                    <Calendar locale="en-US"/>
                </div>
            </div>
            <div className="mission_card">
                <h1>this is a mission card</h1>


            </div>

        </div>
        
    );

};


export default Mission;
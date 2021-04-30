import React, { useState, useEffect } from "react";
import onlineIcon from "../icons/onlineIcon.png";
import "./InfoBar.css";
import $ from "jquery";

const InfoBar = ({ room, timeIsUp, countertime, messages }) => {
  const [endtime, setendtime] = useState();

  if (endtime == undefined) {
    var s = new Date();
    console.log(s);
    console.log(countertime);
    s.setMinutes(s.getMinutes + 1); //only 1 minute chatting time will be given (for testing )
    setendtime(new Date(s).getTime());
  }

  useEffect(() => {
    if (endtime - new Date().getTime() > 0) {
      // to move the timer every second
      var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = endtime - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementsByClassName("chatboxtime")[0].innerHTML = minutes + "minutes " + seconds + "seconds left";
        if (distance <= 1) {
          clearInterval(x);
          document.getElementsByClassName("chatboxtime")[0].innerHTML = " Time is up";
          timeIsUp();
        }
      }, 1000);
      return () => {
        clearInterval(x);
      };
    }
  });

  return (
    <div className='infoBar'>
      <div className='infoBar_leftInnerContainer'>
        <img className='infoBar_onlineIcon' src={onlineIcon} alt='online here' />
        {
          //<h3>{room}</h3>
        }
        <h3 className='chatboxtime'>1 minutes 0 seconds left</h3>
      </div>
      <div className='infoBar_RightInnerContainer'>
        <button className='report_button'> Report</button>
      </div>
    </div>
  );
};

export default InfoBar;

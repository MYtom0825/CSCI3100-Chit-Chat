import React, { useState, useEffect } from "react";
import onlineIcon from "../icons/onlineIcon.png";
import "./InfoBar.css";
import $ from "jquery";

const InfoBar = ({ room, timeIsUp, countertime, messages, userInfo, setmatching, setchatting }) => {
  const [endtime, setendtime] = useState();

  if (endtime == undefined) {
    //initialize the time if haven't
    var s = new Date();
    s.setMinutes(s.getMinutes() + 1); //only 1 minute chatting will be given (for testing purpose)
    setendtime(new Date(s).getTime());
  }

  useEffect(() => {
    if (endtime - new Date().getTime() > 0) {
      //update the timer every 1 second
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

  const report = () => {
    console.log(userInfo.name);
    var username = userInfo.name;
    if (window.confirm("Report you partner?")) {
      var reason = window.prompt("Please tell us the reason of reporting.", "Spamming");
      $.post("http://localhost:5000/report", { room, username, reason });
      window.alert("Report has been submitted. We will review the case. Thank you!");
      setmatching(0);
      setchatting(false);
    }
  };

  return (
    <div className='infoBar'>
      <div className='infoBar_leftInnerContainer'>
        <img className='infoBar_onlineIcon' src={onlineIcon} alt='online here' />
        <h3 className='chatboxtime'>1 minutes 0 seconds left</h3>
      </div>
      <div className='infoBar_RightInnerContainer'>
        <button className='report_button' onClick={report}>
          {" "}
          Report
        </button>
      </div>
    </div>
  );
};

export default InfoBar;

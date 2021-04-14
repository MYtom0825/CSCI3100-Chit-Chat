import "./matching_1.css";
import $ from "jquery";
import React, { Component, useState } from "react";
import Match_loading from "./match_loading";
import Chat from "../../Chat/Chat";
import Popup_quiz from "./popup_quiz";
import Filter_form from "./Filter_form";

const Matching_1 = (props) => {
  const [matching, setmatching] = useState(0);
  const [userPref, setuserPref] = useState();
  const [popupquiz, setpopupquiz] = useState([]);
  const [userResponse, setuserResponse] = useState([]);

  const matchingStartHandler = (event) => {
    event.preventDefault();
    var userPref = {
      university: $("#university").val(),
      faculty: $("#faculty").val(),
      year: parseInt($("input[name='year']:checked").val()), // why need to parseInt
      status: $("input[name='status']:checked").val(),
      gender: $("input[name='gender']:checked").val(),
      ownuni: props.user.university,
      ownstatus: props.user.status,
      owngender: props.user.gender,
      ownyear: props.user.year,
      ownfaculty: props.user.faculty,
    };
    var fee = 2;
    if (userPref.university != "") fee += 2;
    if (userPref.faculty != "") fee += 2;     
    if (userPref.year) fee += 2;
    if (userPref.gender) fee += 2;
    if (userPref.status) fee += 3;
    if (props.user.token < fee){
      window.alert("You do not have enough tokens! Please reset your filter.")
    }
    else{
      if (window.confirm("This matching will consume you " + fee + " token. Press OK to start the matching!")) {
        props.changeToken(fee);
        setmatching(1);
        setuserPref(userPref);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          var response = {
            questions: [
              { id: "001", question: "Which food do you like more?", answer: ["Option A", "Option B"] },
              { id: "002", question: "Which animal do you like more?", answer: ["Option A", "Option B"] },
              { id: "003", question: "Which city do you like more?", answer: ["Option A", "Option B"] },
            ],
          };
          setpopupquiz(response);
          if (this.readyState == 4 && this.status == 200) {
            /*var response= JSON.parse(this.responseText);
            */
            //props.setchatting(true);

            setmatching(3);
          } else if (this.readyState == 4) {
            setmatching(3);
            props.setchatting(true);
          }
        };
        xhttp.open("POST", "http://localhost:5000/match", true);
        xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        // xhttp.setRequestHeader("X-PINGOTHER", "pingpong");
        //xhttp.setRequestHeader("Content-Type", "application/xml");
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(userPref);
        console.log(JSON.stringify(userPref));
        xhttp.send(JSON.stringify(userPref));
      }
    }
  };
  if (matching == 0) return <Filter_form matchingStartHandler={matchingStartHandler} />;
  else if (matching == 1) return <Match_loading userPref={userPref} setmatching={setmatching} />;
  else if (matching == 3) return <Popup_quiz userPref={userPref} setmatching={setmatching} popupquiz={popupquiz} setuserResponse={setuserResponse} />;
  else if (matching == 2) return <Chat setmatching={setmatching} userResponse={userResponse} setchatting={props.setchatting} />;
};

export default Matching_1;

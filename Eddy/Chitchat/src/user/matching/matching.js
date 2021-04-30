import "./matching.css";
import $ from "jquery";
import React, { Component, useState } from "react";
import Match_loading from "./match_loading";
import Chat from "../Chat/Chat";
import Popup_quiz from "./popup_quiz";
import Filter_form from "./Filter_form";

const Matching = (props) => {
  //matching component is the root of matching feature, which includes filter,loading, pop_up_quiz, chatting
  const [matching, setmatching] = useState(0); //state of matching, 0:filter. 1:loading, 3:pop_up_quiz, 2: chatting
  const [userPref, setuserPref] = useState(); //to record user filter
  const [popupquiz, setpopupquiz] = useState([]); //to save popup quiz questions
  const [userResponse, setuserResponse] = useState([]); //to save user answers to pop up quiz
  const [partnerInfo, setpartnerInfo] = useState([]); //to store partner information when matched to create a namecard on the left of chat
  const [charge, setcharge] = useState(0);

  const matchingStartHandler = (event) => {
    event.preventDefault();
    var UserYear = $("input[name='year']:checked").val();
    if (UserYear != undefined) {
      UserYear = parseInt($("input[name='year']:checked").val());
    }
    var userPref = {
      //save user filter
      university: $("#university").val(),
      faculty: $("#faculty").val(),
      year: UserYear,
      status: $("input[name='status']:checked").val(),
      gender: $("input[name='gender']:checked").val(),
      ownuni: props.user.university,
      ownstatus: props.user.status,
      owngender: props.user.gender,
      ownyear: props.user.year,
      ownfaculty: props.user.faculty,
      username: props.user.name,
    };
    var fee = 2;
    if (userPref.university != "") fee += 2;
    if (userPref.faculty != "") fee += 2;
    if (userPref.year) fee += 2;
    if (userPref.gender) fee += 2;
    if (userPref.status) fee += 3;
    if (props.user.token < fee) {
      window.alert("You do not have enough tokens! Please reset your filter.");
    } else {
      if (window.confirm("This matching will consume you " + fee + " token. Press OK to start the matching!")) {
        setuserPref(userPref);
        $.post("http://localhost:5000/match", userPref).done((res) => {
          //send all the user filters to backend so user will queue for partner and enter loading page
          props.changeToken(fee);
          setmatching(1);
          setcharge(fee);
        });
      }
    }
  };
  if (matching == 0) return <Filter_form matchingStartHandler={matchingStartHandler} />;
  else if (matching == 1)
    return (
      <Match_loading userPref={userPref} setmatching={setmatching} setpopupquiz={setpopupquiz} setpartnerInfo={setpartnerInfo} setchatting={props.setchatting} AddToken={props.AddToken} fee={charge} />
    );
  else if (matching == 3) return <Popup_quiz userPref={userPref} setmatching={setmatching} popupquiz={popupquiz} setuserResponse={setuserResponse} />;
  else if (matching == 2) return <Chat setmatching={setmatching} userInfo={props.user} userResponse={userResponse} setchatting={props.setchatting} partnerInfo={partnerInfo} />;
};

export default Matching;

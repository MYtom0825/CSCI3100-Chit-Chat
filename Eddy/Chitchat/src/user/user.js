import React, { Component, useState, useEffect } from "react";
import "./user.css";
import $ from "jquery";
//Import Component
import Menu from "./menu/Menu";
import Profile from "./profile/profile.js";
import Mission from "./mission/Mission";
import Matching from "./matching/matching.js";
import TokenBlock from "./token/Token";

const User = (props) => {
  //user component is the root of all user-only function
  const [tomission, setgomission] = useState(false);
  const [toProfile, setgoProfile] = useState(true);
  const [toChat, setgoChat] = useState(false);
  const [chatting, setchatting] = useState(false);

  useEffect(() => {
    return () => {
      //change token when user switch from functions
      $.post("http://localhost:5000/changetoken", { username: props.user.name, token: props.user.token });
    };
  });

  useEffect(() => {
    //when user logout (props.loc changes to login) we will change its online status to false in database
    return () => {
      $.get("http://localhost:5000/logout", { username: props.user.name });
    };
  }, [props.loc]);

  const MissionGet = () => {
    //switch to mission feature
    setgomission((tomission) => (tomission = true));
    setgoProfile((toProfile) => (toProfile = false));
    setgoChat((toChat) => (toChat = false));
  };
  const ProfileGet = () => {
    //switch to profile feature
    setgoProfile((toProfile) => (toProfile = true));
    setgomission((tomission) => (tomission = false));
    setgoChat((toChat) => (toChat = false));
  };
  const ChatGet = () => {
    //switch to Chat feature
    setgoProfile((toProfile) => (toProfile = false));
    setgomission((tomission) => (tomission = false));
    setgoChat((toChat) => (toChat = true));
  };

  return (
    //render different component when use is in different function
    <div className='app'>
      {
        //chatting indicate whether user is chatting, if true, the menu bar and token will not be shown
      }
      <div>{chatting ? "" : <Menu logout={props.logout} toProf={ProfileGet} tomission={MissionGet} toChat={ChatGet} />}</div>
      <div className='body'>
        {chatting ? "" : <TokenBlock token={props.user.token} />}
        {toProfile ? <Profile user={props.user} /> : ""}
        {tomission ? <Mission user={props.user} AddToken={props.AddToken} /> : ""}
        {toChat ? <Matching setchatting={setchatting} user={props.user} changeToken={props.DeductToken} AddToken={props.AddToken} /> : ""}
      </div>
    </div>
  );
};

export default User;

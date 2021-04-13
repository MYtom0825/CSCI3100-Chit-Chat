import React, { Component, useState } from "react";
import "./user.css";

//Import Component
import Menu from "./menu/Menu";
import Profile from "./profile/profile.js";
import Mission from "./mission/Mission";
import Matching_1 from "./matching/matching_1";
import TokenBlock from "../token/Token";

const User = (props) => {
  const [tomission, setgomission] = useState(false);
  const [toProfile, setgoProfile] = useState(true);
  const [toChat, setgoChat] = useState(false);
  const [chatting, setchatting] = useState(false);

  const MissionGet = () => {
    setgomission((tomission) => (tomission = true));
    setgoProfile((toProfile) => (toProfile = false));
    setgoChat((toChat) => (toChat = false));
    console.log("mission");
  };
  const ProfileGet = () => {
    setgoProfile((toProfile) => (toProfile = true));
    setgomission((tomission) => (tomission = false));
    setgoChat((toChat) => (toChat = false));
    console.log("profile");
  };
  const ChatGet = () => {
    setgoProfile((toProfile) => (toProfile = false));
    setgomission((tomission) => (tomission = false));
    setgoChat((toChat) => (toChat = true));
    console.log("Chat");
  };

  return (
    <div className='app'>
      <div>{chatting ? "" : <Menu logout={props.logout} toProf={ProfileGet} tomission={MissionGet} toChat={ChatGet} />}</div>
      <div className='body'>
        {chatting ? "" : <TokenBlock />}
        {toProfile ? <Profile user={props.user} /> : ""}
        {tomission ? <Mission user={props.user} /> : ""}
        {toChat ? <Matching_1 setchatting={setchatting} user={props.user} /> : ""}
      </div>
    </div>
  );
};

export default User;

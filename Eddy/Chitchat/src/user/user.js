import React, { Component, useState } from "react";
import "./user.css";

//Import Component
import Menu from "./menu/Menu";
import Profile from "./profile/profile.js";
import Mission from "./mission/Mission";
import Mission_card from "./mission/Mission_card";
import Matching_1 from "./matching/matching_1";

const User = () => {
  const [tomission, setgomission] = useState(false);
  const [toProfile, setgoProfile] = useState(false);
  const [toChat, setgoChat] = useState(false);

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
      <div>
        <Menu toProf={ProfileGet} tomission={MissionGet} toChat={ChatGet} />
      </div>
      <div className='body'>
        {toProfile ? <Profile /> : ""}
        {tomission ? <Mission /> : ""}
        {toChat ? <Matching_1 /> : ""}
      </div>
    </div>
  );
};

export default User;

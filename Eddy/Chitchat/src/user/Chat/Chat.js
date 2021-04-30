import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./Chat.css";
import Name_card from "../matching/namecard";
import InfoBar from "./InfoBar/InfoBar";
import Messages from "./Messages/Messages";
import Input from "./Input/Input";
let socket;

var connectionOptions = {
  //prevent cors
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const Chat = ({ setmatching, userInfo, userResponse, setchatting, partnerInfo, AddToken, fee }) => {
  //Chat component includes chatbox (on the right) and name card (on the left)
  //chatbox includes infobar that shows time left for chatting, input bar for typing message, messages for showing message
  //namecard shows partner information and partner answer to pop up quiz
  const ENDPOINT = "localhost:5000";
  const [name, setName] = useState(""); //save user name
  const [room, setRoom] = useState(""); //save room
  const [message, setMessage] = useState(""); //save message that user typed
  const [messages, setMessages] = useState([]); //save message array which includes message from admin, user, partner
  const [End, setEnd] = useState(false); //chat end
  const [confirmed, setconfirmed] = useState(false); // whether chosen sharing ig to partner
  const [share, setshare] = useState(false); //whether to show ig to partner
  const [countertime, setcountertime] = useState(1);
  const [partnerresponse, setpartnerresponse] = useState({}); //save partner answer to pop up quiz

  useEffect(() => {
    const name = userInfo.name;
    const room = partnerInfo.room;
    socket = io.connect(ENDPOINT, connectionOptions);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {}); //user joining socket(chat room)
    socket.emit("answer", { userResponse }); //send pop-up-quiz to partner
    return () => {
      //for unmount
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      //update messages array
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    //to show partner popupquiz answer on the left
    socket.on("showquiz", (Partnerresponse) => {
      setpartnerresponse({ ...partnerresponse, ...Partnerresponse });
    });
  }, [partnerresponse]);

  useEffect(() => {
    //as thw two users enter the room at different time, popupquiz answer has to be sent to other user again when late user joins
    socket.on("shareAgain", () => {
      socket.emit("answer", { userResponse });
    });
  });

  useEffect(() => {
    if (End) {
      //when chatting time is up, admin ask if user wants to share contact to partner
      var confirmation = "Would you like to share your IG account to your partner?";
      var message = { user: "admin", text: confirmation };
      setMessages([...messages, message]);
    }
  }, [End]);

  const timeIsUp = () => {
    //chatting time is up, user will be given 10 seconds to choose whether to share his own contact
    setEnd(true);
    setTimeout(function () {
      setconfirmed(true);
      var confirmation = "You will be directed back to the matching page in 5 seconds.";
      var message = { user: "admin", text: confirmation };
      var confirmation2 = "Hope you have enjoyed the chat^^!";
      var message2 = { user: "admin", text: confirmation2 };
      setMessages([...messages, message, message2]);
      setTimeout(function () {
        //send user back to matching page
        setmatching(0);
        setchatting(false);
      }, 5000);
    }, 10000);
  };

  const sendMessage = (event) => {
    //sending message
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const confirmYes = () => {
    // user choose to share his contact
    var message = { user: name, text: "Yes" };
    setMessages([...messages, message]);
    setconfirmed(true);
    setshare(true);
    socket.emit("share", userInfo.ig, () => setMessage(""));
  };

  const confirmNo = () => {
    //user choose not to share his contact
    var message = { user: name, text: "No" };
    setMessages([...messages, message]);
    setconfirmed(true);
  };
  return (
    <div className='chating_container'>
      <div className='namecard_container'>
        <Name_card partnerresponse={partnerresponse} partnerInfo={partnerInfo} />
      </div>
      <div className='chatbox_container'>
        <div className='chat_outerContainer'>
          <div className='chat_container'>
            <InfoBar
              room={room}
              timeIsUp={timeIsUp}
              countertime={countertime}
              messages={messages}
              userInfo={userInfo}
              setmatching={setmatching}
              setchatting={setchatting}
              AddToken={AddToken}
              fee={fee}
            />
            <Messages messages={messages} name={name} />
            {End ? (
              confirmed ? (
                <h1 style={{ textAlign: "center" }}>Please wait!</h1>
              ) : (
                <div>
                  <button className='confirmButton' onClick={confirmYes}>
                    Yes
                  </button>
                  <button className='confirmButton' onClick={confirmNo}>
                    No
                  </button>
                </div>
              )
            ) : (
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

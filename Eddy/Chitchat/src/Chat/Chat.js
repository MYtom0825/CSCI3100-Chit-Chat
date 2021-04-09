import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Cookies from "universal-cookie";

import "./Chat.css";
import Name_card from "../user/matching/namecard";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import { set } from "mongoose";
let socket;

const cookies = new Cookies();
//hello
var connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const Chat = ({ setmatching }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [End, setEnd] = useState(false);
  const [user, setUser] = useState("");
  const ENDPOINT = "localhost:5000";
  const [confirmed, setconfirmed] = useState(false);
  const [share, setshare] = useState(false);
  const [countertime, setcountertime] = useState(1);

  useEffect(() => {
    const name = cookies.get("Username");
    const room = cookies.get("Userroom");
    socket = io.connect(ENDPOINT, connectionOptions);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});
    console.log(cookies.getAll().Username);
    return () => {
      //for unmount
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    if (End) {
      var confirmation = "Would you like to share your IG account to your partner?";
      var message = { user: "admin", text: confirmation };
      console.log(message);
      setMessages([...messages, message]);
    }
  }, [End]);

  const timeIsUp = () => {
    setEnd(true);
    setTimeout(function () {
      setconfirmed(true);
      var confirmation = "You will be directed back to the matching page in 5 seconds.";
      var message = { user: "admin", text: confirmation };
      console.log(message);
      var confirmation2 = "Hope you have enjoyed the chat^^!";
      var message2 = { user: "admin", text: confirmation2 };
      console.log(message);
      setMessages([...messages, message, message2]);
      setTimeout(function () {
        setmatching(0);
      }, 5000);
    }, 10000);
    /*
    setTimeout(function () {
      setconfirmed(true);
    }, 10000);
    if (!share) {
      var confirmation = "Your partner did not share IG";
      var message = { user: "admin", text: confirmation };
      console.log(message);
      setMessages([...messages, message]);
    }
    var confirmation = "You will be directed back to the matching page in 5 seconds.";
    var message = { user: "admin", text: confirmation };
    console.log(message);
    setMessages([...messages, message]);
    var confirmation = "Hope you have enjoyed the chat^^!";
    var message = { user: "admin", text: confirmation };
    console.log(message);
    setMessages([...messages, message]);
    socket.disconnect();
    socket.off();
    setTimeout(function () {
      setmatching(0);
    }, 5000);*/
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const confirmYes = () => {
    var message = { user: name, text: "Yes" };
    setMessages([...messages, message]);
    setconfirmed(true);
    setshare(true);
    socket.emit("share", cookies.getAll().UserIG, () => setMessage(""));
  };

  const confirmNo = () => {
    var message = { user: name, text: "No" };
    setMessages([...messages, message]);
    setconfirmed(true);
  };
  return (
    <div className='chating_container'>
      <div className='namecard_container'>
        <Name_card />
      </div>
      <div className='chatbox_container'>
        <div className='chat_outerContainer'>
          <div className='chat_container'>
            <InfoBar room={room} timeIsUp={timeIsUp} countertime={countertime} />
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

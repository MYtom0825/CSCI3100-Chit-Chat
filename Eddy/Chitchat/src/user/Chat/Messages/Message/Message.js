import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  //show each message, there are two kinds, message sent by user, message sent by partner
  let isSentByCurrentUser = false;

  if (user === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? ( //if message is sent by user, it will be on the right, vice versa
    <div className='messageContainer justifyEnd'>
      <p className='sentText'> {name}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
      </div>
      <p className='sentText pl-10'> {user}</p>
    </div>
  );
};

export default Message;

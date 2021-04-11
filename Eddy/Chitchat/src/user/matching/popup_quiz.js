import React, { useState, useEffect } from "react";
import $ from "jquery";

const Popup_quiz = ({ setmatching, popupquiz, setuserResponse }) => {
  const popupquizHandler = (e) => {
    e.preventDefault();
    var userResponse = [];
    popupquiz.questions.map((x) => userResponse.push($(`input[name=${x.id}]:checked`).val()));
    setuserResponse(userResponse);
    setmatching(2);
  };
  return (
    <div>
      <form>
        {popupquiz.questions.map((x) => (
          <div>
            <p>{x.question}</p>
            <input type='radio' id={x.answer[0]} name={x.id} value={x.answer[0]} defaultChecked />
            <label htmlFor={x.answer[0]}>{x.answer[0]}</label>
            <br />
            <input type='radio' id={x.answer[1]} name={x.id} value={x.answer[1]} />
            <label htmlFor={x.answer[1]}>{x.answer[1]}</label>
            <br />
          </div>
        ))}
        <button onClick={(event) => popupquizHandler(event)}>Submit</button>
      </form>
    </div>
  );
};

export default Popup_quiz;

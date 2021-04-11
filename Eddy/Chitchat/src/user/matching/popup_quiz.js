import React, { useState, useEffect } from "react";
import $ from "jquery";
import Filter from "./Filter";
import "./pop_up_quiz.css";
import Timer from "./Timer";

const Popup_quiz = ({ userPref, setmatching, popupquiz, setuserResponse }) => {
  const popupquizHandler = (e) => {
    e.preventDefault();
    var userResponse = [];
    popupquiz.questions.map((x) => userResponse.push($(`input[name=${x.id}]:checked`).val()));
    setuserResponse(userResponse);
    setmatching(2);
  };
  return (
    <div>
      <div className='mission_1'>
        <div className='grid_container'>
          <div className='popupquiz_matching_intro'>
            <Filter gender={userPref.gender} university={userPref.university} major={userPref.major} year={userPref.year} status={userPref.status} />
          </div>
          <div className='pop_up_quiz_layout'>
            <h1>We have found you a partner!</h1>
            <p>Before entering the chat box, please finish a short pop-up quiz</p>
            <div className='pop_up_quiz_holder'>
              <form className='pop_up_quiz'>
                <p>You have 2 minutes to answer the following questions.</p>
                <Timer />
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
                <br></br>
                <button onClick={(event) => popupquizHandler(event)}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup_quiz;

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
      major: $("#major").val(),
      year: $("input[name='year']:checked").val(),
      status: $("input[name='status']:checked").val(),
      gender: $("input[name='gender']:checked").val(),
    };
    var fee = 2;
    if (userPref.university != "") fee += 2;
    if (userPref.major != "") fee += 2;
    if (userPref.year) fee += 2;
    if (userPref.gender) fee += 2;
    if (userPref.status) fee += 3;
    if (window.confirm("This matching will consume you " + fee + " token. Press OK to start the matching!")) {
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
      xhttp.open("POST", "http://localhost:5000", true);
      xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      // xhttp.setRequestHeader("X-PINGOTHER", "pingpong");
      //xhttp.setRequestHeader("Content-Type", "application/xml");
      xhttp.setRequestHeader("Content-type", "application/json");
      console.log(userPref);
      console.log(JSON.stringify(userPref));
      xhttp.send(JSON.stringify(userPref));
    }
  };
  if (matching == 0)
    return (
      <Filter_form matchingStartHandler={matchingStartHandler} />
      /*<div className='mission_1'>
        <div className='matching1_grid_container'>
          <div className='matching_intro'>
            <ul>
              <p>Welcome to the Matching Function!</p>
              <p>You may pay tokens to add filter for your matching.</p>
              <p>Charges are below:</p>
              <p>
                Basic Charge: 2 tokens
                <br />
                Gender:2 tokens
                <br />
                University: 2 tokens
                <br />
                Major: 2 tokens
                <br />
                Year: 2 tokens
                <br />
                Status: 3 tokens
                <br />
              </p>
            </ul>
            <p>Enjoy the Chat!</p>
          </div>
          <div className='matching_form_holder'>
            <form className='matching_form'>
              <h1>What kind of people do you want to look for?</h1>
              <label htmlFor='university'>University:</label>
              <select id='university' name='university'>
                <option value=''>University</option>
                <option value='CUHK'>CUHK</option>
                <option value='HKU'>HKU</option>
                <option value='HKUST'>HKUST</option>
                <option value='CityU'>CityU</option>
                <option value='PolyU'>PolyU</option>
                <option value='BU'>BU</option>
              </select>
              <label htmlFor='major'>Major:</label>
              <select id='major' name='major'>
                <option value=''>Major</option>
                <option value='Science'>Science</option>
                <option value='Social Science'>Social Science</option>
                <option value='Engineering'>Engineering</option>
                <option value='Business'>Business</option>
              </select>
              <div className='radio-container'>
                <input id='year1' name='year' type='radio' value='1' />
                <label htmlFor='year1'>Year 1</label>
                <input id='year2' name='year' type='radio' value='2' />
                <label htmlFor='year2'>Year 2</label>
                <input id='year3' name='year' type='radio' value='3' />
                <label htmlFor='year3'>Year 3</label>
                <input id='year4+' name='year' type='radio' value='4+' />
                <label htmlFor='year4+'>Year 4+</label>
              </div>
              <div className='radio-container'>
                <input id='available' name='status' type='radio' value='A' />
                <label htmlFor='available'>Available</label>
                <input id='occupied' name='status' type='radio' value='O' />
                <label htmlFor='occupied'>Occupied</label>
              </div>
              <div className='radio-container'>
                <input id='male' name='gender' type='radio' value='M' />
                <label htmlFor='male'>Male</label>
                <input id='female' name='gender' type='radio' value='F' />
                <label htmlFor='female'>Female</label>
              </div>
              <div className='button-set'>
                <button type='reset' className='submit'>
                  Reset
                </button>
                <button className='submit' onClick={(event) => matchingStartHandler(event)}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>*/
    );
  else if (matching == 1) return <Match_loading userPref={userPref} setmatching={setmatching} />;
  else if (matching == 3) return <Popup_quiz userPref={userPref} setmatching={setmatching} popupquiz={popupquiz} setuserResponse={setuserResponse} />;
  else if (matching == 2) return <Chat setmatching={setmatching} userResponse={userResponse} setchatting={props.setchatting} />;
};

export default Matching_1;

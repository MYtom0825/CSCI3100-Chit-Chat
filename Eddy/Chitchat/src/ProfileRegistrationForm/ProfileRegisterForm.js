import React, { Component } from "react";
import $ from "jquery";

import "./ProfileRegisterForm.css";

class ProfileRegisterForm extends React.Component {
  //user will receive a link to access the profile register form, user can input his personal info and create his account
  //only a valid link can do registration
  setProfile = (e) => {
    //sending all user input to backend for registration
    let picture = "picture",
      userName = $("#ProfileName").val(),
      nickName = $("#ProfileName").val(),
      year = $("#Year").val(),
      gender = $("input[name='gender']:checked").val(),
      desc = $("#Description").val(),
      faculty = $("#Faculty").val(),
      university = $("#University").val(),
      status = $("input[name='status']:checked").val(),
      contact = $("#ProfileIG").val();
    let interest = [];
    $("input[class='interest']:checked").each(function (i) {
      interest[i] = $(this).val();
    });
    var parameters = { "interest[]": interest };
    let objectID = window.location.pathname.split("/")[2];
    window.alert("Registration request has been sent! You may login and use ChitChat Now!");
    $.post("http://localhost:5000/registration/" + objectID, { userName, picture, nickName, year, gender, desc, faculty, university, status, interest, contact });
    this.props.backToLogin(); //back to login page after registration
  };

  componentDidMount() {
    let objectID = window.location.pathname.split("/")[2];
    $.get("http://localhost:5000/registration/" + objectID)
    .done((res) => {
      if (res == "wrong") {
        this.props.backToLogin();
      }
    })
  }

  render() {
    const user = {};
    var facalties = ["Engineering", "Medicine", "Law", "Social Science", "Science", "Busness Administration", "Art", "Education"];
    var genders = ["Male", "Female"];
    var universities = ["CUHK", "HKU", "LingU", "CityU", "HKUST", "PolyU", "BU", "EduU", "OU", "HSU"];
    var years = ["1", "2", "3", "4", "5", "6"];
    var Status = ["Available", "Occupied"];
    var interests1 = ["Dancing", "Pop music", "Classic music", "Track and field", "Ball game", "Water sport", "Extreme sport", "Movie", "Reading"];
    var interests2 = ["Drinking", "Singing", "Yoga", "Meditation", "Mobile game", "Video game", "Programming ", "Travel", "Eating"];

    return (
      <div className='ProfileRegisterForm_Container'>
        <form
          onSubmit={(event) => {
            this.setProfile(event);
          }}
        >
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Name:
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <input className='ProfileRegisterForm_input' id='ProfileName' name='ProfileName' defaultValue={user.name} type='text' required></input>
              <br></br>
            </div>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Year:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <select className='ProfileRegisterForm_input' id='Year' name='Year' required>
                <option value=''></option>
                {years.map(function (year) {
                  return (
                    <option value={year} selected={year == user.years}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Gender:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' style={{ padding: "0" }} type='ProfileRegisterForm_colm'>
              {genders.map(function (gender) {
                return (
                  <a className='ProfileRegisterForm_colm30' type='ProfileRegisterForm_colm' id='Gender'>
                    <input type='radio' id={gender} name='gender' value={gender} defaultChecked={gender == user.gender} required></input>
                    <a> {gender}</a>
                  </a>
                );
              })}
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Description:{" "}
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <textarea className='ProfileRegisterForm_input' style={{ height: "100px" }} id='Description' name='Description' defaultValue={user.description} required></textarea>
            </div>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Faculty:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <select className='ProfileRegisterForm_input' id='Faculty' name='Faculty' required>
                <option value=''></option>
                {facalties.map(function (facalty) {
                  return (
                    <option value={facalty} selected={facalty == user.facalty}>
                      {facalty}
                    </option>
                  );
                })}
              </select>
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              University:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <select className='ProfileRegisterForm_input' id='University' name='University' required>
                <option value=''></option>
                {universities.map(function (university) {
                  return (
                    <option value={university} selected={university == user.university}>
                      {university}
                    </option>
                  );
                })}
              </select>
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Status:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' style={{ padding: "0" }} type='ProfileRegisterForm_colm' required>
              {Status.map(function (status) {
                return (
                  <a className='ProfileRegisterForm_colm30' type='ProfileRegisterForm_colm' id='status'>
                    <input type='radio' id={status} value={status} name='status' defaultChecked={status == user.status} required></input>
                    <a> {status}</a>
                  </a>
                );
              })}
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              IG Account
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <input className='ProfileRegisterForm_input' id='ProfileIG' name='ProfileIG' defaultValue={user.IG} required></input>
              <br></br>
            </div>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Interests:{" "}
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <div className='ProfileRegisterForm_colm30'>
                {interests1.map(function (interest) {
                  return (
                    <div style={{ padding: "10px" }} type='ProfileRegisterForm_colm' id='Interest'>
                      <input
                        type='checkbox'
                        className='interest'
                        id={interest}
                        name={interest}
                        value={interest}
                        defaultChecked={() => {
                          if (user != null) {
                            user.interest.find((user_interest) => user_interest == interest);
                          }
                        }}
                      ></input>
                      <a> {interest}</a>
                    </div>
                  );
                })}
              </div>
              <div className='ProfileRegisterForm_colm30'>
                {interests2.map(function (interest) {
                  return (
                    <div style={{ padding: "10px" }} type='ProfileRegisterForm_colm' id='Interest'>
                      <input
                        type='checkbox'
                        className='interest'
                        id={interest}
                        name={interest}
                        value={interest}
                        defaultChecked={() => {
                          if (user != null) {
                            user.interest.find((user_interest) => user_interest == interest);
                          }
                        }}
                      ></input>
                      <a> {interest}</a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='ProfileRegisterForm_row'>
            <button
              type='submit'
              value='Submit'
              id='Submit'
              className='ProfileRegisterForm_button'
              onClick={(event) => {
                let interest = $("input[class='interest']:checked").val();
                if (interest == null) {
                  window.alert("Please choose at least one interest.");
                  event.preventDefault();
                }
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileRegisterForm;

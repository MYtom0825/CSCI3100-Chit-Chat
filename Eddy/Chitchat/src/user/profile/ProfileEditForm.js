import React, { Component } from "react";
import $ from "jquery";

import "../../ProfileRegistrationForm/ProfileRegisterForm.css";

class ProfileEditForm extends React.Component {
  setProfile = (e) => {
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

    $.post("http://localhost:5000/registration/" + objectID, { userName, picture, nickName, year, gender, desc, faculty, university, status, interest });
  };
  render() {
    /* name: "Tom",
      gender: "Male",
      picture: "",
      description: "Hi I am using react",
      facalty: "Engineering",
      university: "CUHK",
      years: "3",
      status: "Available",
      interest: ["Dancing", "Pop music", "Classic music"],*/
    var user = this.props.user;
    var facalties = ["Engineering", "Medicine", "Law", "Social Science", "Science", "Busness Administration", "Art", "Education"];
    var genders = ["Male", "Female"];
    var universities = ["CUHK", "HKU", "LingU", "CityU", "HKUST", "PolyU", "BU", "EduU", "OU", "HSU"];
    var years = ["1", "2", "3", "4", "5", "6"];
    var Status = ["Available", "Occupied"];
    var interests1 = ["Dancing", "Pop music", "Classic music", "Track and field", "Ball game", "Water sport", "Extreme sport", "Movie", "Reading"];
    var interests2 = ["Drinking", "Singing", "Yoga", "Meditation", "Mobile game", "Video game", "Programming ", "Travel", "Eating"];

    return (
      <div className='ProfileRegisterForm_Container'>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Profile Picture:{" "}
          </label>
          <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <input type='file' id='ProfilePic' name='ProfilePic'></input>
          </a>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Name:
          </label>
          <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <input className='ProfileRegisterForm_input' id='ProfileName' name='ProfileName' defaultValue={user.name} disabled></input>
            <br></br>
          </div>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Year:{" "}
          </label>
          <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <select className='ProfileRegisterForm_input' id='Year' name='Year'>
              <option value='Nan'></option>
              {years.map(function (year) {
                return (
                  <option value={year} selected={year == user.year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </a>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Gender:{" "}
          </label>
          <a className='ProfileRegisterForm_colm75' style={{ padding: "0" }} type='ProfileRegisterForm_colm'>
            {genders.map(function (gender) {
              return (
                <a className='ProfileRegisterForm_colm30' type='ProfileRegisterForm_colm' id='Gender'>
                  <input type='radio' id={gender} name='gender' value={gender} defaultChecked={gender == user.gender}></input>
                  <a> {gender}</a>
                </a>
              );
            })}
          </a>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Description:{" "}
          </label>
          <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <textarea className='ProfileRegisterForm_input' style={{ height: "100px" }} id='Description' name='Description' defaultValue={user.description}></textarea>
          </div>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Faculty:{" "}
          </label>
          <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <select className='ProfileRegisterForm_input' id='Faculty' name='Faculty'>
              <option value='Nan'></option>
              {facalties.map(function (facalty) {
                return (
                  <option value={facalty} selected={facalty == user.faculty}>
                    {facalty}
                  </option>
                );
              })}
            </select>
          </a>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            University:{" "}
          </label>
          <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <select className='ProfileRegisterForm_input' id='University' name='University'>
              <option value='Nan'></option>
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
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Status:{" "}
          </label>
          <a className='ProfileRegisterForm_colm75' style={{ padding: "0" }} type='ProfileRegisterForm_colm'>
            {Status.map(function (status) {
              return (
                <a className='ProfileRegisterForm_colm30' type='ProfileRegisterForm_colm' id='status'>
                  <input type='radio' id={status} value={status} name='status' defaultChecked={status == user.status}></input>
                  <a> {status}</a>
                </a>
              );
            })}
          </a>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            IG Account
          </label>
          <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <input className='ProfileRegisterForm_input' id='ProfileIG' name='ProfileIG' defaultValue={user.IG}></input>
            <br></br>
          </div>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Interests:{" "}
          </label>
          <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <div className='ProfileRegisterForm_colm30'>
              {interests1.map(function (interest) {
                return (
                  <div style={{ padding: "10px" }} type='ProfileRegisterForm_colm' id='Interest'>
                    <input type='checkbox' className='interest' id={interest} name={interest} value={interest} defaultChecked={user.interest.includes(interest)}></input>
                    <a> {interest}</a>
                  </div>
                );
              })}
            </div>
            <div className='ProfileRegisterForm_colm30'>
              {interests2.map(function (interest) {
                return (
                  <div style={{ padding: "10px" }} type='ProfileRegisterForm_colm' id='Interest'>
                    <input type='checkbox' className='interest' id={interest} name={interest} value={interest} defaultChecked={user.interest.includes(interest)}></input>
                    <a> {interest}</a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='ProfileRegisterForm_row'>
          <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
            Reset Password:
          </label>
          <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
            <input className='ProfileRegisterForm_input' id='Profile_reset_password' name='Profile_reset_password' placeholder='Fill in if you want to reset your password'></input>
            <br></br>
          </div>
        </div>
        <div className='ProfileRegisterForm_row'>
          <button
            type='submit'
            value='Submit'
            id='Submit'
            className='ProfileRegisterForm_button'
            onClick={(event) => {
              this.setProfile(event);
              this.props.backToProfile();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileEditForm;

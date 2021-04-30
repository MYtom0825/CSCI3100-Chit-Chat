import React, { Component, useState } from "react";
import $ from "jquery";
import LoginPage from "./login/login_page.js";
import User from "./user/user";
import ProfileRegisterForm from "./ProfileRegistrationForm/ProfileRegisterForm";
import Forget_password from "./Forget_password/Forget_password.js";

const BACKEND = "http://localhost:5000/";

class App extends React.Component {
  // this app.js mainly handles features without logging in, if user is logged in, he will be directed to "user"
  // App class is the root of all components
  constructor(props) {
    super(props);
    this.state = {
      //location state is used to identify which page the user is in, it includes "login","user","registration","forget password"
      loc: window.location.pathname.split("/")[1] || "login", //localhost:3000/login
      userID: null,
      //user is an array to save all user info after he login
      user: null,
    };

    window.addEventListener("popstate", () => {
      this.setState({
        loc: window.location.pathname.split("/")[1] || "login",
      });
    });
  }

  DeductToken = (MinusToken) => {
    var newUser = this.state.user;
    newUser.token -= MinusToken;
    this.setState({ user: newUser });
  };

  AddToken = (AddToken, place) => {
    var newUser = this.state.user;
    newUser.token += AddToken;
    this.setState({ user: newUser });
    if (place != 1) {
      window.alert("Mission Finished!");
    } else {
      window.alert("Charged token has been given back to you.");
    }
  };

  logout = () => {
    this.setState({ loc: "login" }); //logout function will be passed to menu component, when user clicks logout, he will be directed back to login
  };

  loginHandler = (e) => {
    // this function is to get user input in login form and handle login affairs
    e.preventDefault();
    let email = $("#userEmail").val(),
      pw = $("#userPW").val();
    var details = {
      email: email,
      password: pw,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody);
    $.post(BACKEND + "login", { email: email, password: pw })
      .done((res) => {
        var response = res;
        console.log(res);
        switch (
          res.loginstate //different login state, 0: no this account, 1: incorrect password, 2: login success, 3: multiple login
        ) {
          case 0:
            window.alert("User not found. Please try with another email or Sign Up");
            break;
          case 1:
            window.alert("Incorrect Password");
            break;
          case 2:
            window.alert("Login Success");
            window.history.pushState(null, null, "/user"); //allowing user to get back to login page by clicking last page
            this.setState({
              loc: "user",
              user: res,
            });
            break;
          case 3:
            window.alert("We do not accept multiple login. Your account is logged in in other devices");
            break;
          default:
        }
      })
      .fail(() => {
        /* a test case with hardcoded user for frontend testing
        window.history.pushState(null, null, "/user");
        const user = {
          name: "Tom",
          gender: "Male",
          picture: "",
          description: "Hi I am using react",
          facalty: "Engineering",
          university: "CUHK",
          years: "3",
          status: "A0",
          interest: ["Dancing", "Pop music", "Classic music"],
        };
        this.setState({
          loc: "user",
          userID: 123,
          user: user,
        });*/
        window.alert("System is unavailable right now. Please try again later! ");
      });
  };

  backToLogin = () => {
    // this is for features without logging in
    window.history.pushState(null, null, "/login");
    this.setState({
      loc: "login",
    });
  };

  render() {
    if (this.state.loc == "login") {
      return <LoginPage loginHandler={this.loginHandler} />;
    } else if (this.state.loc == "user" && this.state.user != null) {
      // user state will be set up only when login success, non-user can not access user component without proper log in
      return <User logout={this.logout} user={this.state.user} DeductToken={this.DeductToken} AddToken={this.AddToken} loc={this.state.loc} />;
    } else if (this.state.loc == "registration" && window.location.pathname.split("/")[2] != undefined && window.location.pathname.split("/")[2] != "") {
      return <ProfileRegisterForm backToLogin={this.backToLogin} />;
    } else if (this.state.loc == "forgotpassword") {
      return <Forget_password backToLogin={this.backToLogin} />;
    } else return <LoginPage loginHandler={this.loginHandler} />;
  }
}

export default App;

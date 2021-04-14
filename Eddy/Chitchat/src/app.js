import React, { Component, useState } from "react";
import $ from "jquery";
import LoginPage from "./login/login_page.js";
import User from "./user/user";
import Cookies from "universal-cookie";
import ProfileRegisterForm from "./ProfileRegistrationForm/ProfileRegisterForm";
import Forget_password from "./Forget_password/Forget_password.js";
const cookies = new Cookies();

const BACKEND = "http://localhost:5000/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: window.location.pathname.split("/")[1] || "login", //localhost:3000/user
      userID: null,
      user: null,
    };
    window.addEventListener("popstate", () => {
      this.setState({
        loc: window.location.pathname.split("/")[1] || "login",
      });
    });
  }

  DeductToken = (MinusToken) => {
    this.state.user.token -= MinusToken;
    console.log("Token changed");
  };

  logout = () => {
    this.setState({ loc: "login" });
  };
  loginHandler = (e) => {
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
    console.log(
      formBody
    ); /*
    $.ajax({
      url: "http://localhost:5000/login",
      type: "post",
      data: { email: email, password: pw },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Access-Control-Allow-Headers": "*", //If your header name has spaces or any other char not appropriate
        "Access-Control-Allow-Origin": "*", //for object property name, use quoted notation shown in second
      },
      success: function (data) {
        console.log(data);
      },
    });*/
    /*fetch("http://localhost:5000/login/" + formBody, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });*/ $.post(
      BACKEND + "login",
      { email: email, password: pw }
    )
      .done((res) => {
        var response = res;
        console.log(res);
        switch (res.loginstate) {
          case 0:
            console.log("0");
            window.alert("User not found. Please try with another email or Sign Up");
            break;
          case 1:
            console.log("1");
            window.alert("Incorrect Password");
            break;
          case 2:
            console.log("2");
            window.alert("Login Success");
            window.history.pushState(null, null, "/user");
            this.setState({
              loc: "user",
              user: res,
            });
            break;
          default:
        }
      })
      .fail(() => {
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
        });
        console.log(this.state.user);
      });
  };

  backToLogin = () => {
    window.history.pushState(null, null, "/login");
    this.setState({
      loc: "login",
    });
  };
  /*
  loadingHandler = () => {
    window.history.pushState(null, null, "/loading");
    this.setState({
      loc: "loading",
    });
  };
  namecardHandler = () => {
    window.history.pushState(null, null, "/namecard");
    this.setState({
      loc: "namecard",
    });
  };
  filterformHandler = () => {
    window.history.pushState(null, null, "/filterform");
    this.setState({
      loc: "filterform",
    });
  };*/
  render() {
    if (this.state.loc == "login") {
      return <LoginPage loginHandler={this.loginHandler} />; /*loadingHandler={this.loadingHandler} namecardHandler={this.namecardHandler} filterformHandler={this.filterformHandler}*/
    } else if (this.state.loc == "user" && this.state.user != null) {
      return <User logout={this.logout} user={this.state.user} DeductToken={this.DeductToken} />;
    } else if (this.state.loc == "registration" && window.location.pathname.split("/")[2] != undefined && window.location.pathname.split("/")[2] != "") {
      return <ProfileRegisterForm backToLogin={this.backToLogin} />;
    } /*else if (this.state.loc == "loading") {
      return <Match_loading />;
    } else if (this.state.loc == "filter") {
      return <filter />;  else if (this.state.loc == "namecard") {
      return <Name_card />;
      } else return <Matching_1 />;*/ else if (
      this.state.loc == "forgotpassword"
    ) {
      return <Forget_password backToLogin={this.backToLogin} />;
    } else return <LoginPage loginHandler={this.loginHandler} />;
  }
  componentDidMount() {
    /*if (this.state.userID == null && this.state.loc != "login") {
      window.alert("Please login before going to destinated page!");
      this.setState({ loc: "login" });
    }*/
  }
}

/*
else if (this.state.loc == "user") {
      return <User />;
    }
  const [status, setStatus] = useState(1);

  const matchingStartHandler = () => {
    setStatus(2);
  };

  const eventHandler = () => {
    setStatus(1);
  };

  if (true) {
    console.log("ok");
    setStatus(2);
  }
*/
export default App;

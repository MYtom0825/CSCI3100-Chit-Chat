import React, { Component, useState } from "react";
import $ from "jquery";
import LoginPage from "./login/login_page.js";
import User from "./user/user";
import Matching_1 from "./user/matching/matching_1.js";
import Match_loading from "./user/matching/match_loading.js";
import Name_card from "./user/matching/namecard.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const BACKEND = "http://localhost:3001/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: window.location.pathname.split("/")[1] || "login", //localhost:3000/user
      userID: null,
    };
    window.addEventListener("popstate", () => {
      this.setState({
        loc: window.location.pathname.split("/")[1] || "login",
      });
    });
  }

  loginHandler = () => {
    let email = $("#userEmail").val(),
      pw = $("#userPW").val();
    $.post(BACKEND + "login", { email: email, password: pw })
      .done((res) => {
        var response = JSON.parse(res);
        switch (response.loginstate) {
          case 0:
            window.alert("User not found. Please try with another email or Sign Up");
            break;
          case 1:
            window.alert("Incorrect Password");
            break;
          case 2:
            window.alert("Login Success");
            window.history.pushState(null, null, "/user");
            this.setState({
              loc: "home",
              userID: response.userID,
            });
            cookies.set("Username", this.state.userID, { path: "/" });
            break;
          default:
        }
      })
      .fail(() => {
        window.history.pushState(null, null, "/user");
        this.setState({
          loc: "user",
          userID: 123,
        });
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
    } else if (this.state.loc == "user") {
      return <User />;
    } /*else if (this.state.loc == "loading") {
      return <Match_loading />;
    } else if (this.state.loc == "filter") {
      return <filter />;  else if (this.state.loc == "namecard") {
      return <Name_card />;
      } else return <Matching_1 />;*/
  }
  componentDidMount() {
    /*
    if (this.state.userID == null && this.state.loc != "login") {
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
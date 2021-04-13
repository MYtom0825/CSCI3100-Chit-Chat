import React from "react";
import "./login_page.css";
import $ from "jquery";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      container: "container",
    };
  }
  signUpSwitchEventListener = () => {
    this.setState({
      container: "container right-panel-active",
    });
  };

  signInSwitchEventListener = () => {
    this.setState({
      container: "container",
    });
  };

  signUpEventHandler = (e) => {
    let email = $("#regEmail").val().toString(),
      pw = $("#regPW").val();
    console.log(email);
    console.log(pw);
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");
    if (email == "" || pw == "") {
      window.alert("Please input all the field.");
    } else if (!(lastAtPos > 0 && email.includes("edu.hk", lastAtPos) && lastAtPos < lastDotPos && email.indexOf("@@") == -1 && lastDotPos > 2 && email.length - lastDotPos > 2)) {
      window.alert("Wrong Email Format!");
      e.preventDefault();
    } else {
      $.post("http://localhost:5000/register", {
        email: email,
        password: pw,
      })
        .done((res) => {
          window.alert("Email-verification has been sent to your Universal Email.");
          e.preventDefault();
        })
        .fail(() => {
          window.alert("Request Failed. Please try again later!");
          e.preventDefault();
        });
    }
  };

  render() {
    cookies.set("Username", Math.floor(Math.random() * 100).toString(), { path: "/" });
    cookies.set("UserIG", "IGAccount", { path: "/" });
    return (
      <div className='login_page'>
        <div className={this.state.container} id='container'>
          <div className='form-container sign-up-container'>
            <form>
              <h1>Create Account</h1>
              <input type='email' placeholder='University Email' id='regEmail' required />
              <input type='password' placeholder='Password' id='regPW' required />
              <button
                onClick={(event) => {
                  this.signUpEventHandler(event);
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className='form-container sign-in-container'>
            <form>
              <h1>Sign in</h1>
              <input type='email' placeholder='University Email' id='userEmail' />
              <input type='password' placeholder='Password' id='userPW' />
              <a href='./forgotpassword'>Forgot your password?</a>
              <button onClick={(event) => this.props.loginHandler(event)}>Sign In</button>
            </form>
          </div>
          <div className='overlay-container'>
            <div className='overlay'>
              <div className='overlay-panel overlay-left'>
                <h1>Welcome Back!</h1>
                <p>Login to start your ChitChat!</p>
                <button className='ghost' id='signIn' onClick={this.signInSwitchEventListener}>
                  Sign In
                </button>
              </div>
              <div className='overlay-panel overlay-right'>
                <h1>Hello, Friend!</h1>
                <p>Sign up and start matching!</p>
                <button className='ghost' id='signUp' onClick={this.signUpSwitchEventListener}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;

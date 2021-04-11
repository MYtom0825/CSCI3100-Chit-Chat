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

  signUpEventHandler = () => {
    let username = $("#regUsername").val(),
      email = $("#regEmail").val(),
      pw = $("#regPW").val();
    $.post("http://localhost:3001/register", {
      username: username,
      email: email,
      password: pw,
    })
      .done((res) => {
        window.alert(res);
      })
      .fail(() => {
        window.alert('Request has been sent to "http://localhost:3001/register"');
      });
  };

  render() {
    cookies.set("Username", Math.floor(Math.random() * 100).toString(), { path: "/" });
    cookies.set("UserIG", "IGAccount", { path: "/" });
    return (
      <div>
        <div className={this.state.container} id='container'>
          <div className='form-container sign-up-container'>
            <form action='#'>
              <h1>Create Account</h1>
              <input type='text' placeholder='Name' id='regUsername' />
              <input type='email' placeholder='University Email' id='regEmail' />
              <input type='password' placeholder='Password' id='regPW' />
              <button onClick={this.signUpEventHandler}>Sign Up</button>
            </form>
          </div>
          <div className='form-container sign-in-container'>
            <form action='#'>
              <h1>Sign in</h1>
              <input type='email' placeholder='University Email' id='userEmail' />
              <input type='password' placeholder='Password' id='userPW' />
              <a href='./forgotpassword'>Forgot your password?</a>
              <button onClick={this.props.loginHandler}>Sign In</button>
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

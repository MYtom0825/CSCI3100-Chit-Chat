import React from "react";
import "./Forget_password.css";
import $ from "jquery";

class Forget_password extends React.Component {
  constructor(props) {
    super(props);
  }
  forgetPasswordHandler = (e) => {
    e.preventDefault();
    let email = $("#forgot_email").val();
    $.post("http://localhost:5000/forgotpw", {
      email: email,
    })
      .done((res) => {
        window.alert(res);
      })
      .fail((res) => {
        window.alert("Please check your email and reset your password");
      });
  };

  back = (e) => {
    e.preventDefault();
    this.props.backToLogin();
  };

  render() {
    return (
      <div className='forget_password_container'>
        <div className='forget_password_header'>
          <h1>Forgot your password?</h1>
          <p>Don't worry! Fill in your university email and we will send you a link to reset your password.</p>
        </div>
        <form>
          <div className='forget_password_input'>
            <label for='forget_email'>University email</label>
            <br />
            <input type='email' id='forgot_email' name='forgot_email' />
            <br />
            <br />
            <button
              className='forget_password_submit'
              onClick={(event) => {
                this.forgetPasswordHandler(event);
              }}
            >
              Reset Password
            </button>
            <button
              className='forget_password_submit'
              onClick={(event) => {
                this.back(event);
              }}
            >
              {" "}
              Back to Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Forget_password;

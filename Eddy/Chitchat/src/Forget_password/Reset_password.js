import React from "react";
import "./Reset_password.css";
import $ from "jquery";

class Reset_password extends React.Component {
  constructor(props) {
    super(props);
  }
  resetPasswordHandler = (e) => {
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
      <div className='reset_password_container'>
        <div className='reset_password_header'>
          <h1 className='reset_password_title'>Reset password</h1>
          <p>Please fill in your new password.</p>
        </div>
        <form>
          <div className='reset_password_input'>
            <label for='reset_email'>Password</label>
            <br />
            <input type='password' id='new_password' name='new_password' />
            <br />
            <br />
            <button
              className='reset_password_submit'
              onClick={(event) => {
                this.resetPasswordHandler(event);
              }}
            >
              Reset Password
            </button>
            <button
              className='reset_password_submit'
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

export default Reset_password;
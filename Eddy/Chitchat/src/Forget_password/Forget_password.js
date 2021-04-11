import React from "react";
import "./Forget_password.css";

class Forget_password extends React.Component{
    render(){
        return(
            <div className="forget_password_container">
                <div className="forget_password_header">
                <h1>Forgot your password?</h1>
                <p>Don't worry! Fill in your university email and we will send you a link to reset your password.</p>
                </div>
                <form>
                    <div className="forget_password_input">
                    <label for="forget_email">University email</label><br/>
                    <input type="email" id="forgot_email" name="forgot_email"/><br/><br/>
                    <button className="forget_password_submit">Reset Password</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Forget_password;
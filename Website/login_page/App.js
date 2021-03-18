import React from "react";
import './App.css';

class App extends React.Component{
  state = {
    container: "container"
  }

  signUpSwitchEventListener = () => {
    this.setState(
      {
        container: "container right-panel-active"
      }
    )
  }

  signInSwitchEventListener = () => {
    this.setState(
      {
        container: "container"
      }
    )
  }

  render(){
    return (
      <div className={this.state.container} id="container">
        <div className="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="University Email" />
                <input type="password" placeholder="Password" />
                <button>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <input type="email" placeholder="University Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>Login to start your ChitChat!</p>
                    <button className="ghost" id="signIn" onClick={this.signInSwitchEventListener}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Sign up and start matching!</p>
                    <button className="ghost" id="signUp" onClick={this.signUpSwitchEventListener}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;

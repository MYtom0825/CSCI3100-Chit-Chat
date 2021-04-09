import React from "react";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailerrormessage: ''
        };
        this.handleEmail = this.handleEmail.bind(this);
    }
    handleEmail(event) {
        if (event.target.value.indexof('@') > -1 && event.target.value.includes('edu.hk', pos)) {
            this.setState({emailerrormessage: ""});
        }else{
            this.setState({usernameerrormessage: "Please input an university email address!"});
        }
    }

    render() {
        return (
            <div className="">
                <div className="">
                    <form action="#">
                        <h1>Verify Email</h1>
                        <input type="email" placeholder="University Email" onChange={this.handleEmail} />
                        <span style={{color:"red"}}>{this.state.emailerrormessage}</span>
                        <button>Verify</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
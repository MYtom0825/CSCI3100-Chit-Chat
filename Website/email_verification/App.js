import React from "react";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailerrormessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let lastAtPos = event.target.value.lastIndexOf('@');
        let lastDotPos = event.target.value.lastIndexOf('.');

        if (!(lastAtPos > 0 && event.target.value.includes('edu.hk', lastAtPos) && 
              lastAtPos < lastDotPos && event.target.value.indexOf('@@') == -1 && 
              lastDotPos > 2 && (event.target.value.length - lastDotPos) > 2))
        {
            this.setState({emailerrormessage: "Please input an university email address!"});
        }
    }

    handleValidation(state) {
        if (state({emailerrormessage: ""})) {
            return true;
        }
        return false;
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.handleValidation(this.state)) {
           alert("Form submitted! Please check your university email for registration!");
        }
        else {
            alert("Form has errors.");
        }
    }

    render() {
        return (
            <div className="">
                <div className="">
                    <form action="#" onSubmit={this.handleSubmit}>
                        <h1>Verify Email</h1>
                        <input type="email" placeholder="University Email" onChange={this.handleChange} />
                        <span style={{color:"red"}}>{this.state.emailerrormessage}</span>
                        <button value="submit">Verify</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
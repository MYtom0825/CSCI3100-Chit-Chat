import React from "react";
import './App.css';

import Menu from "./Menu/Menu";
import Filter from "./Filter/Filter";
import Timer from "./Timer/Timer";

class App extends React.Component{
  filter = {
    gender: "Male",
    university: "CUHK",
    major: "Computer Science",
    year: "2",
    status: "Available"
  }

  questions = [{
    Q1: ["Chocolate", "Candy"],
    Q2: ["Hiking", "Reading"],
    Q3: ["Japan", "Korea"]
  }]


  render(){
    return (
      <div>
      <div className="mission_1">
      <div className="grid_container">
        <div className="menu_bar"></div>
        <div className="matching_intro">
          <Filter gender={this.filter.gender}
                  university={this.filter.university}
                  major={this.filter.major}
                  year={this.filter.year}
                  status={this.filter.status}
                  />
        </div>
        <div className="pop_up_quiz_layout">
          <h1>We have found you a partner!</h1>
          <p>Before entering the chat box, please finish a short pop-up quiz</p>
          <div className="pop_up_quiz_holder">
            <form className="pop_up_quiz">
              <p>You have 2 minutes to answer the following questions.</p>
              <Timer/>
              <h1 className="question">Q1. I prefer</h1>
              <div className="radio-container">
                <input type="radio" id={this.questions[0].Q1[0]} name="Q1" value={this.questions[0].Q1[0]}/>
                <label for={this.questions[0].Q1[0]}>{this.questions[0].Q1[0]}</label>
                <input type="radio" id={this.questions[0].Q1[1]} name="Q1" value={this.questions[0].Q1[1]}/>
                <label for={this.questions[0].Q1[1]}>{this.questions[0].Q1[1]}</label><br></br>
              </div>
              <h1 className="question">Q2. I prefer</h1>
              <div className="radio-container">
                <input type="radio" id={this.questions[0].Q2[0]} name="Q2" value={this.questions[0].Q2[0]}/>
                <label for={this.questions[0].Q2[0]}>{this.questions[0].Q2[0]}</label>
                <input type="radio" id={this.questions[0].Q1[1]} name="Q2" value={this.questions[0].Q2[1]}/>
                <label for={this.questions[0].Q2[1]}>{this.questions[0].Q2[1]}</label><br></br>
              </div>
              <h1 className="question">Q3. I prefer</h1>
              <div className="radio-container">
                <input type="radio" id={this.questions[0].Q3[0]} name="Q3" value={this.questions[0].Q3[0]}/>
                <label for={this.questions[0].Q3[0]}>{this.questions[0].Q3[0]}</label>
                <input type="radio" id={this.questions[0].Q3[1]} name="Q3" value={this.questions[0].Q3[1]}/>
                <label for={this.questions[0].Q3[1]}>{this.questions[0].Q3[1]}</label><br></br>
              </div>
              <br></br>
              <button className="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
}

export default App;

import React from "react";
import './Pop_up_quiz.css';

import Menu from "./../Menu/Menu";
import Filter from "./../Filter/Filter";
import Timer from "./../Timer/Timer";

class Pop_up_quiz extends React.Component{
  filter = {
    gender: "Male",
    university: "CUHK",
    major: "Computer Science",
    year: "2",
    status: "Available"
  }

  questions = [
    ["Q1","Chocolate", "Candy"],
    ["Q2", "Hiking", "Reading"],
    ["Q3", "Japan", "Korea"]
  ]


  render(){
    return (
      <div>
      <div className="mission_1">
      <div className="grid_container">
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
              {this.questions.map((x) => (
                <div className="question">
                  <div className="pop-up-radio-container">
                  <p>{x[0]}</p>
                  <input type='radio' id={x[1]} value={x[1]} name={x[1]}/>
                  <label for={x[1]}>{x[1]}</label>
                  <input type='radio' id={x[2]} value={x[2]} name={x[2]}/>
                  <label for={x[2]}>{x[2]}</label>
                  <br />
                  </div>
                </div>
              )
              )}
              <br></br>
              <button className="pop_up_submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
}

export default Pop_up_quiz;

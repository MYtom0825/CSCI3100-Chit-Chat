import React from "react";
import "./match_loading.css";
import $ from "jquery";
import Filter from "./Filter";
import Loading_time from "./Loading_time";

class Match_loading extends React.Component {
  // this component is for user queuing for partner
  constructor(props) {
    super(props);
  }
  helperFunction = (x, y, z) => {
    //helper function to set different state
    this.props.setpopupquiz(y);
    this.props.setpartnerInfo(z); //save partner info so in partner information can be shown near chat box
    this.props.setchatting(true); //set chatting to true when user has partner so he can not switch between feature after matched
    this.props.setmatching(x); //proceed to pop_up_quiz stage
  };

  myTimer = () => {
    // every complete 5 seconds for example (7:05:00||7:05:05 and so on) so the two users will enter the room at similar time
    //send get request to check if user found partner
    var d = new Date();
    var t = d.getSeconds();
    if (t % 5 == 0) {
      $.get("http://localhost:5000/matchresult", { username: this.props.userPref.username }).done((res) => {
        if (res != "no partner yet") {
          //if there is partner, set pop-up-quiz question and proceed to pop-up-quiz
          var response = {
            // trial pop-up-quiz, when there is more questions, question will be get from database
            questions: [
              { id: "001", question: "Which food do you like more?", answer: ["Chocolate", "Candy"] },
              { id: "002", question: "Which animal do you like more?", answer: ["Cat", "Dog"] },
              { id: "003", question: "Which city do you like more?", answer: ["Hong Kong", "Tai Wan"] },
            ],
          };
          this.helperFunction(3, response, res);
        }
      });
    }
  };

  componentDidMount() {
    //call above function every second during loading to check whether user got partner
    var checkMatched = setInterval(() => this.myTimer(), 1000);
    document.getElementById("return").addEventListener("click", function myStopFunction() {
      clearInterval(checkMatched);
    });
  }

  componentWillUnmount() {
    // before matched, user can quit the matching function and he will stop queueing
    $("#return").trigger("click");
    $.get("http://localhost:5000/deletequeue", { username: this.props.userPref.username }).done(() => {});
  }
  render() {
    return (
      <div>
        <div className='mission_1'>
          <div className='grid_container'>
            <div className='matching_intro'>
              <Filter
                gender={this.props.userPref.gender}
                university={this.props.userPref.university}
                faculty={this.props.userPref.faculty}
                year={this.props.userPref.year}
                status={this.props.userPref.status}
              />
            </div>
            <div className='loading_layout'>
              <div className='loader'></div>
              <Loading_time />
              <p className='remind'>You may reduce filter to have faster matching...</p>
              <button
                type='submit'
                className='submit'
                id='return'
                onClick={() => {
                  // quit matching and stop queuing
                  this.props.setmatching(0);
                }}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Match_loading;

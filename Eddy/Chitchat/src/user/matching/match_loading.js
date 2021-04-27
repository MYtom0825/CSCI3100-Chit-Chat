import React from "react";
import "./match_loading.css";
import $ from "jquery";
import Filter from "./Filter";
import Loading_time from "./Loading_time";

class Match_loading extends React.Component {
  constructor(props) {
    super(props);
  }
  helperFunction = (x, y, z) => {
    this.props.setpopupquiz(y);
    this.props.setpartnerInfo(z);
    this.props.setchatting(true);
    this.props.setmatching(x);
  };

  myTimer = () => {
    var d = new Date();
    var t = d.getSeconds();
    if (t % 5 == 0) {
      $.get("http://localhost:5000/matchresult", { username: this.props.userPref.username }).done((res) => {
        if (res != "no partner yet") {
          var response = {
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
    var checkMatched = setInterval(() => this.myTimer(), 1000);
    document.getElementById("return").addEventListener("click", function myStopFunction() {
      clearInterval(checkMatched);
    });
  }

  componentWillUnmount() {
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

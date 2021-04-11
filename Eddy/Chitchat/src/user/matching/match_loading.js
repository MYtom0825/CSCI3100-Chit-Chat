import React from "react";
import "./match_loading.css";

import Filter from "./Filter";

class Match_loading extends React.Component {
  constructor(props) {
    super(props);
  }
  /*filter = {
    gender: "Male",
    university: "CUHK",
    major: "Computer Science",
    year: "2",
    status: "Available",
  };*/

  render() {
    return (
      <div>
        <div className='mission_1'>
          <div className='grid_container'>
            <div className='menu_bar'></div>
            <div className='matching_intro'>
              <Filter
                gender={this.props.userPref.gender}
                university={this.props.userPref.university}
                major={this.props.userPref.major}
                year={this.props.userPref.year}
                status={this.props.userPref.status}
              />
            </div>
            <div className='loading_layout'>
              <div class='loader'></div>
              <h1>Queueing Time: </h1>
              <p className='remind'>You may reduce filter to have faster matching...</p>
              <button type='submit' className='submit'>
                Return to filter selection
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Match_loading;
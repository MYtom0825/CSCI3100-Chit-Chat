import React from "react";
import './App.css';


import Menu from "./Menu/Menu"
import Filter from "./Filter/Filter"

class App extends React.Component{
  filter = {
    gender: "Male",
    university: "CUHK",
    major: "Computer Science",
    year: "2",
    status: "Available"
  }

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
        <div className="loading_layout">
          <div class="loader"></div>
          <h1>Queueing Time: </h1>
          <p className="remind">You may reduce filter to have faster matching...</p>
          <button type="submit" className="submit">
              Return to filter selection
          </button>
        </div>
      </div>
    </div>
      </div>
    );
  }
}

export default App;

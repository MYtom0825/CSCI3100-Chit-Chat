import React from "react";

class Filter extends React.Component {
  //This is to show what filter has user selected, show when user is waiting for partner and doing pop-up-quiz
  //user may stop queuing and reset filter when he is not matched
  render() {
    return (
      <div>
        <h1 className='pop_up_quiz_title'>You are looking for a</h1>
        <br />
        <div className='pop_up_quiz_title'>
          <h2>Gender: {this.props.gender}</h2>
          <br />
          <h2>University: {this.props.university}</h2>
          <br />
          <h2>Faculty: {this.props.faculty}</h2>
          <br />
          <h2>Year: {this.props.year}</h2>
          <br />
          <h2>Status: {this.props.status}</h2>
        </div>
      </div>
    );
  }
}

export default Filter;

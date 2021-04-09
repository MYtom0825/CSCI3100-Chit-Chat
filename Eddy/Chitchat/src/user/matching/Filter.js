import React from "react";

class Filter extends React.Component {
  render() {
    return (
      <div>
        <h1>You are looking for a</h1>
        <br />
        <h2>Gender: {this.props.gender}</h2>
        <br />
        <h2>University: {this.props.university}</h2>
        <br />
        <h2>Major: {this.props.major}</h2>
        <br />
        <h2>Year: {this.props.year}</h2>
        <br />
        <h2>Status: {this.props.status}</h2>
      </div>
    );
  }
}

export default Filter;

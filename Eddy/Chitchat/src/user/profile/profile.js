import React, { Component, useState } from "react";
import "./profile.css";

import ProfileDetail from "./profileDetail";

class profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div style={{ padding: "5px 0 0 45%" }}>
          <img className='profile_img' src='https://placeimg.com/400/400/tech' alt='test' width='300' height='300'></img>
        </div>
        <div className='profile_detail'>
          <ProfileDetail
            na={this.props.user.name}
            gen={this.props.user.gender}
            pic={this.props.user.picture}
            des={this.props.user.description}
            fac={this.props.user.facalty}
            u={this.props.user.university}
            yrs={this.props.user.years}
            sts={this.props.user.status}
            int={this.props.user.interest}
          />
        </div>
        <div className='ProfileRegisterForm_row'>
          <button className='button_frame'>Edit</button>
        </div>
      </div>
    );
  }
}

export default profile;

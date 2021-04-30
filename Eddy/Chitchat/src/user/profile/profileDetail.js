import React from "react";
import "./profile.css";

const ProfileDetail = (props) => {
  //rendering user info
  return (
    <div>
      <div className='profile_row'>
        <p style={{ fontSize: "2vw" }} className='profile_colm25'>
          Name:{" "}
        </p>
        <p style={{ fontSize: "2vw" }} className='profile_colm75'>
          {" "}
          {props.na}
        </p>
      </div>
      <div className='profile_row'>
        <p style={{ fontSize: "2vw" }} className='profile_colm25'>
          Gender:{" "}
        </p>
        <p style={{ fontSize: "2vw" }} className='profile_colm75'>
          {" "}
          {props.gen}
        </p>
      </div>
      <div className='profile_row'>
        <p style={{ fontSize: "2vw" }} className='profile_colm25'>
          Description:{" "}
        </p>
        <p style={{ fontSize: "2vw" }} className='profile_colm75'>
          {" "}
          {props.des}
        </p>
      </div>
      <div className='profile_row'>
        <p style={{ fontSize: "2vw" }} className='profile_colm25'>
          Faculty:{" "}
        </p>
        <p style={{ fontSize: "2vw" }} className='profile_colm75'>
          {" "}
          {props.fac}
        </p>
      </div>
      <div className='profile_row'>
        <p style={{ fontSize: "2vw" }} className='profile_colm25'>
          University:{" "}
        </p>
        <p style={{ fontSize: "2vw" }} className='profile_colm75'>
          {" "}
          {props.u}
        </p>
      </div>
      <div className='profile_row'>
        <p style={{ fontSize: "2vw" }} className='profile_colm25'>
          Years:{" "}
        </p>
        <p style={{ fontSize: "2vw" }} className='profile_colm75'>
          {" "}
          {props.yrs}
        </p>
      </div>
      <div className='profile_row'>
        <p style={{ fontSize: "2vw" }} className='profile_colm25'>
          Status:{" "}
        </p>
        <p style={{ fontSize: "2vw" }} className='profile_colm75'>
          {" "}
          {props.sts}
        </p>
      </div>
      <div className='profile_row'>
        <p className='profile_colm25' style={{ fontSize: "2vw", height: props.int == null ? "10vh" : props.int.length * 80 }}>
          Interests:{" "}
        </p>
        {props.int.map(function (interest) {
          return (
            <p style={{ fontSize: "2vw" }} className='profile_colm75'>
              {" "}
              {interest}{" "}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileDetail;

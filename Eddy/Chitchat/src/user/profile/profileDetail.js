import React from "react";
import "./profile.css";

const ProfileDetail = (props) => {
  return (
    <div>
      <div className='profile_row'>
        <h1 className='profile_colm25'>Name: </h1>
        <h1 className='profile_colm75'> {props.na}</h1>
      </div>
      <div className='profile_row'>
        <h1 className='profile_colm25'>Gender: </h1>
        <h1 className='profile_colm75'> {props.gen}</h1>
      </div>
      <div className='profile_row'>
        <h1 className='profile_colm25'>Description: </h1>
        <h1 className='profile_colm75'> {props.des}</h1>
      </div>
      <div className='profile_row'>
        <h1 className='profile_colm25'>Faculty: </h1>
        <h1 className='profile_colm75'> {props.fac}</h1>
      </div>
      <div className='profile_row'>
        <h1 className='profile_colm25'>University: </h1>
        <h1 className='profile_colm75'> {props.u}</h1>
      </div>
      <div className='profile_row'>
        <h1 className='profile_colm25'>Years: </h1>
        <h1 className='profile_colm75'> {props.yrs}</h1>
      </div>
      <div className='profile_row'>
        <h1 className='profile_colm25'>Status: </h1>
        <h1 className='profile_colm75'> {props.sts}</h1>
      </div>
      <div className='profile_row'>
        <h1 className='profile_colm25' style={{height: props.int.length * 73}}>Interests: </h1>
        {props.int.map(function (interest) {
            return <h1 className='profile_colm75'> {interest} </h1>;
          })}
      </div>
    </div>
  );
};

export default ProfileDetail;

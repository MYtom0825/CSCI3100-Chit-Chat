import React, {Component, useState} from 'react';
import "./Profile.css";
import ProfileRegisterForm from "../ProfileRegistrationForm/ProfileRegisterForm"

import ProfileDetail from './profileDetail';


class profile extends React.Component{

    
    render(){

        
       var user=[]
       user[0]=this.props.user;
        return(
            <nav>
            <div style={{padding:"5px 0 0 45%"}}>
                <img className="profile_img" src="https://placeimg.com/400/400/tech" alt="test" width="300" height="300"></img>
            </div>
            <div className="profile_detail">
                {user.map((user) => (
                    <ProfileDetail  na={user.name} 
                                    gen={user.gender} 
                                    pic={user.picture} 
                                    des={user.description} 
                                    fac={user.facalty} 
                                    u={user.university}
                                    yrs={user.years} 
                                    sts={user.status} 
                                    int={user.interest} />
                ))}
            </div>
            <div className="ProfileRegisterForm_row">
            <input type="submit" value="Edit" id="Submit" onClick={<ProfileRegisterForm />} ></input>
               </div>
            
        </nav>
        )
    }
}

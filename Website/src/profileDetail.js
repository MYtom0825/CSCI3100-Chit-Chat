import React from 'react';
import "./App.css";


const ProfileDetail = (props) => {
    return(

        <div>
            <h1>Name: </h1><br></br>
            
            <h1>Gender: </h1><br></br>
            <h1>Description: </h1><br></br>
            <h1>Major: </h1><br></br>
            <h1>University: </h1><br></br>
            <h1>Years: </h1><br></br>
            <h1>Status: </h1><br></br>
            <h1>Interest: </h1>
            <h1>{props.na}</h1><br></br>
            <h1>{props.gen}</h1><br></br>
            <h1>{props.mj}</h1><br></br>
            <h1>{props.u}</h1><br></br>
            <h1>{props.yrs}</h1><br></br>
            <h1>{props.sts}</h1><br></br>
            <h1>{props.int}</h1><br></br>
            <h1>{props.na}</h1><br></br>

            

        </div>
    )



}


export default ProfileDetail
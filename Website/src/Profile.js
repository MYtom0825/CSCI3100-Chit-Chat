import React from 'react';
import "./App.css";

import ProfileDetail from './profileDetail';



const profile = () => {
    const user = [{ name: "Tom",
                    gender: "Male",
                    picture: "",
                    description: "Hi I am use react",
                    major: "BEng",
                    university: "CU",
                    years: "3",
                    status: "A0",
                    interest: "nothing"}];


    return(
        <nav>
            
            <img className="profile_img" src="https://placeimg.com/400/400/tech" alt="test" width="300" height="300"></img>
            
            <div className="profile_detail">
                {user.map((user) => (
                    <ProfileDetail  na={user.name} 
                                    gen={user.gender} 
                                    pic={user.picture} 
                                    des={user.description} 
                                    mj={user.major} 
                                    u={user.university}
                                    yrs={user.years} 
                                    sts={user.status} 
                                    int={user.interest} />
                ))}
                

            </div>
        
        </nav>
    )



}


export default profile
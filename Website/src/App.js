import React, {useState} from 'react';
import "./App.css";

//Import Component
import Menu from "./menu"
import Profile from "./Profile"
import Mission from "./mission"


const App = () => {
  //Write Javascript Here

  const [tomission, setgomission] = useState(false)
  const [toProfile, setgoProfile] = useState(false)

  const MissionGet = () =>{
    setgomission((tomission) => tomission=true);
    setgoProfile((toProfile)=> toProfile=false);
    console.log("mission");
    
  };
  const ProfileGet = () =>{
    setgoProfile((toProfile)=> toProfile=true);
    setgomission((tomission)=>tomission=false)
    console.log("haha");
  }

  return(
    <div className="app">
      <div>
        <Menu toProf={ProfileGet} tomission={MissionGet}/>
    
      </div>
      <div className="body">
      {toProfile ? <Profile />:''}
      {tomission ? <Mission />:''}
      
        
        
       
      </div>
      
      
        
      
    </div>
    
  );
}

export default App;


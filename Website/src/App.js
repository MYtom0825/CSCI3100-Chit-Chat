import React, {useState} from 'react';
import "./App.css";

//Import Component
import Menu from "./menu"
import Profile from "./Profile"


const App = () => {
  //Write Javascript Here
 

  return(
    <div className="app">
      <div>
     <Menu />
      </div>
      <div className="body"> 
        
        <Profile />
       
      </div>
      
      
        
      
    </div>
    
  );
}

export default App;


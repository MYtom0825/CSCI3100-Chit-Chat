import React from 'react';
import "./App.css";
import Profile from "./Profile"



const Menu = () => {
 

    return(

        <div className="menu">
           <a className="menu_item" onClick={Profile} width="300" height="300"><i class="fas fa-home fa-3x"></i></a>
           <a className="menu_item"><i class="fas fa-user fa-3x"></i></a>
           <a className="menu_item"><i class="fas fa-calendar-alt fa-3x"></i></a>
        </div>
        
    );

};


export default Menu;
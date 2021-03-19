import React, {Component} from 'react';
import "./Name_card.css";

//import Component



class Name_card extends React.Component{
    render(){
        return(
            <div>
                <div className="card">
                    
                    <img className="card_img" src="https://placeimg.com/400/400/tech" alt="John" width="270" height="270"></img>
                    <h1 className="name">Tom Tom</h1>
                    <h3 className="info">Basic Info:</h3>
                    <p className="info">Hi</p>
                    <h3 className="info">Common Interest:</h3>
                    <p className="info">Hi</p>
                    <h3 className="info">Answer to the Pop-up Quiz:</h3>
                    <li className="info">Hi</li>
                    <div >
                        
                    </div>
                    <p><cardbutton>Contact</cardbutton></p>
                    
                </div>
            </div>
        )
    }
}

export default Name_card;

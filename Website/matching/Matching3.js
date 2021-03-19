import React, {Component} from 'react';
import "./Matching.css";


//import Component
import Name_card from './Name_card'
import Chating from './Chat_Component/Chating'

class Matching3 extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <Name_card />
                </div>
            </div>
        )
    }
}

export default Matching3;
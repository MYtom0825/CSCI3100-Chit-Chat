import React, {Component} from 'react';
import "./Mission.css";

//import Component
class Mission_card extends React.Component{
    render(){
        return(
            <div>
                <td>{this.props.name}</td>
                <td>{this.props.content}</td>
                <td><a href={this.props.link} >GO!(Yet designed)</a></td>
            </div>
        )
    }
}
/*
const Mission_card = (props) => {
 

    return(
        <div>
            <td>{props.name}</td>
            <td>{props.content}</td>
            <td><a href={props.link} >GO!(Yet designed)</a></td>
             
        </div>
        
    );

};
*/

export default Mission_card;
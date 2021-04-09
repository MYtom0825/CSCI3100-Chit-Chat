import React, {Component} from 'react';
import "./ProfileRegisterForm.css";



class ProfileRegisterForm extends React.Component{
    render(){
        const user = { name: "Tom",
                gender: "Male",
                picture: "",
                description: "Hi I am use react",
                major: "BEng",
                university: "CU",
                years: "3",
                status: "A0",
                interest: "nothing"};
        var facalties=[ "Engineering",
                        "Medicine",
                        "Law",
                        "Social Science",
                        "Science",
                        "Busness Administration",
                        "Art",
                        "Education"]
        var genders=["Hidden", "Male", "Female"]
        var universities=["CUHK", "HKU", "LingU", "CityU", "HKUST", "PolyU", "BU","EduU", "OU", "HSU"]
        var status=["A", "O", "OBA", "U"]
        var interests1=[ "Dancing",
                        "Pop music", 
                        "Classic music", 
                        "Track and field", 
                        "Ball game", 
                        "Water sport", 
                        "Extreme sport", 
                        "Movie",
                        "Reading"]
        var interests2=[ 
                        "Drinking", 
                        "Singing", 
                        "Yoga", 
                        "Meditation", 
                        "Mobile game", 
                        "Video game", 
                        "Programming ", 
                        "Travel", 
                        "Eating"]
        
        return(

            <div className="ProfileRegisterForm_Container">
                
               <div className="ProfileRegisterForm_row">
                    <a className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Profile Picture: </a>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <input type="file" id="ProfilePic" name="ProfilePic"></input>
                    </a>
               </div>
               <div className="ProfileRegisterForm_row">
                    <a className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Name:</a>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <input type="ProfileRegisterForm_input" id="ProfileName" name="ProfileName"></input>
                    </a>
               </div>
               <div className="ProfileRegisterForm_row">
                    <a className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Gender: </a>
                    <a className="ProfileRegisterForm_colm75" style={{padding:"0"}}type="ProfileRegisterForm_colm" >
                    {genders.map(function(gender){
                        return (
                        <a className="ProfileRegisterForm_colm30" type="ProfileRegisterForm_colm" id="Gender">
                            <input type="radio" id={gender} name={gender}></input>
                        <a>  {gender}</a>
                    </a>)
                    })}
                    </a>
               </div>
               <div className="ProfileRegisterForm_row">
                    <a className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Description: </a>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <textarea type="ProfileRegisterForm_text" style={{height:"100px"}}id="Description" name="Description"></textarea>
                    </a>
               </div>
               <div className="ProfileRegisterForm_row">
                    <a className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Facalty: </a>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                    <select type="ProfileRegisterForm_select" id="Facalty" name="Facalty">

                        <option value="Nan"></option>
                        {facalties.map(function(facalty){
                            return <option value={facalty}>{facalty}</option>
                        })}
                    </select> 
                    </a>
               </div>
               <div className="ProfileRegisterForm_row">
                    <a className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >University: </a>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                    <select type="ProfileRegisterForm_select" id="Facalty" name="Facalty">
                    <option value="Nan"></option>
                    {universities.map(function(university){
                            return <option  value={university}>{university}</option>
                    })}
                    </select>
                    </a>

               </div>
               <div className="ProfileRegisterForm_row">
                    <a className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Status: </a>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <input type="ProfileRegisterForm_input" id="Status" name="Status"></input>
                    </a>
               </div>

               <div className="ProfileRegisterForm_row">
                    <a className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Interests: </a>
                    <div className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <div className="ProfileRegisterForm_colm30">
                        {interests1.map(function(interest){
                            return (
                            <div style={{padding:"10px"}}type="ProfileRegisterForm_colm" id="Interest">
                                <input type="checkbox" id={interest} name={interest} value={interest}></input>
                            <a>  {interest}</a>
                        </div>)
                        })}
                        </div>
                        <div className="ProfileRegisterForm_colm30">
                        {interests2.map(function(interest){
                            return (
                            <div style={{padding:"10px"}}type="ProfileRegisterForm_colm" id="Interest">
                                <input type="checkbox" id={interest} name={interest} value={interest}></input>
                            <a>  {interest}</a>
                        </div>)
                        })}
                        </div>
                    </div>
               </div>
               
            </div>
        )
    }
}


export default ProfileRegisterForm
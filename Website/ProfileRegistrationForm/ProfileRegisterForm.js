import React, {Component} from 'react';
import "./ProfileRegisterForm.css";



class ProfileRegisterForm extends React.Component{
    render(){
        /*const user = { name: "Tom",
                gender: "Male",
                picture: "",
                description: "Hi I am using react",
                facalty: "Engineering",
                university: "CUHK",
                years: "3",
                status: "A0",
                interest: ["Dancing","Pop music","Classic music"] };*/
        var user = this.props.user;
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
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Profile Picture: </label>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <input type="file" id="ProfilePic" name="ProfilePic"></input>
                    </a>
               </div>
               <div className="ProfileRegisterForm_row">
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Name:</label>
                    <div className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <input className="ProfileRegisterForm_input" id="ProfileName" name="ProfileName" defaultValue={user.name}></input>
                        <br></br>
                    </div>
               </div>
               <div className="ProfileRegisterForm_row">
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Status: </label>
                    <div className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <input className="ProfileRegisterForm_input" id="Content" name="Status" defaultValue={user.status}></input>
                    </div>
               </div>
               <div className="ProfileRegisterForm_row">
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Gender: </label>
                    <a className="ProfileRegisterForm_colm75" style={{padding:"0"}}type="ProfileRegisterForm_colm" >
                    {genders.map(function(gender){
                        
                        return (
                        <a className="ProfileRegisterForm_colm30" type="ProfileRegisterForm_colm" id="Gender">
                            <input type="radio" id={gender} name="gender" defaultChecked={gender == user.gender}></input>
                        <a>  {gender}</a>
                    </a>)
                    })}
                    </a>
               </div>
               <div className="ProfileRegisterForm_row">
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Description: </label>
                    <div className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <textarea className="ProfileRegisterForm_input" style={{height:"100px"}}id="Description" name="Description" defaultValue={user.description}></textarea>
                    </div>
               </div>
               <div className="ProfileRegisterForm_row">
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Facalty: </label>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                    <select className="ProfileRegisterForm_input" id="Facalty" name="Facalty">

                        <option value="Nan"></option>
                        {facalties.map(function(facalty){
                            return <option value={facalty} selected={facalty == user.facalty}>{facalty}</option>
                        })}
                    </select> 
                    </a>
               </div>
               <div className="ProfileRegisterForm_row">
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >University: </label>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                    <select className="ProfileRegisterForm_input" id="Facalty" name="Facalty">
                    <option value="Nan"></option>
                    {universities.map(function(university){
                            return <option  value={university} selected={university == user.university}>{university}</option>
                    })}
                    </select>
                    </a>

               </div>
               <div className="ProfileRegisterForm_row">
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Status: </label>
                    <a className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <input className="ProfileRegisterForm_input" id="Status" name="Status" defaultValue={user.status}></input>
                    </a>
               </div>

               <div className="ProfileRegisterForm_row">
                    <label className="ProfileRegisterForm_colm25" type="ProfileRegisterForm_colm" >Interests: </label>
                    <div className="ProfileRegisterForm_colm75" type="ProfileRegisterForm_colm" >
                        <div className="ProfileRegisterForm_colm30">
                        {interests1.map(function(interest){
                            return (
                            <div style={{padding:"10px"}}type="ProfileRegisterForm_colm" id="Interest">
                                <input type="checkbox" 
                                        id={interest} 
                                        name={interest} 
                                        value={interest} 
                                        defaultChecked={user.interest.find(user_interest => user_interest == interest)}>
                                </input>
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
               <div className="ProfileRegisterForm_row">
                   <input type="submit" value="Submit" id="Submit" ></input>
               </div>

            </div>
        )
    }
}


export default ProfileRegisterForm

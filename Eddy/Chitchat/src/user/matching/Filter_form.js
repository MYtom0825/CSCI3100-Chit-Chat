import React from "react";
import "./Filter_form.css";

class Filter_form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='mission_1'>
        <div className='filter_form_grid_container'>
          <div className='filter_form_matching_intro'>
            <h2 style={{color:"purple"}}>Welcome to the Matching Function!</h2>
            <p>You may pay tokens to add filter for your matching.</p>
            <br />
            <h3 style={{color:"purple"}}>Charges are below:</h3>
            <br />
            <p >Basic Charge: 2 tokens</p>
            <br />
            <p >Gender:2 tokens</p>
            <br />
            <p >University: 2 tokens</p>
            <br />
            <p >Major: 2 tokens</p>
            <br />
            <p >Year: 2 tokens</p>
            <br />
            <p >Status: 3 tokens</p>
            <br />

            <h3 style={{color:"purple"}}>Enjoy the Chat!</h3>
          </div>
          <div className='matching_form_holder'>
            <form className='matching_form'>
              <h1 style={{color:"purple"}}>What kind of people do you want to look for?</h1>
              <div class='filter-form-radio-container'>
                <input id='Gender_M' name='gender' type='radio' value='Male' />
                <label for='Gender_M'>Male</label>
                <input id='Gender_F' name='gender' type='radio' value='Female' />
                <label for='Gender_F'>Female</label>
              </div>
              <label for='university'>University:</label>
              <select id='university' name='university'>
                <option value=''>University</option>
                <option value='CUHK'>CUHK</option>
                <option value='HKU'>HKU</option>
                <option value='HKUST'>HKUST</option>
                <option value='CityU'>CityU</option>
                <option value='PolyU'>PolyU</option>
                <option value='BU'>BU</option>
              </select>
              <label for='major'>Major:</label>
              <select id='major' name='major'>
                <option value=''>Major</option>
                <option value='Science'>Science</option>
                <option value='Social Science'>Social Science</option>
                <option value='Engineering'>Engineering</option>
                <option value='Business'>Business</option>
              </select>
              <div class='filter-form-radio-container'>
                <input id='year1' name='year' type='radio' value='1' />
                <label for='year1'>Year 1</label>
                <input id='year2' name='year' type='radio' value='2' />
                <label for='year2'>Year 2</label>
                <input id='year3' name='year' type='radio' value='3' />
                <label for='year3'>Year 3</label>
                <input id='year4+' name='year' type='radio' value='4+' />
                <label for='year4+'>Year 4+</label>
              </div>
              <div class='filter-form-radio-container'>
                <input id='available' name='status' type='radio' value='Available' />
                <label for='available'>Available</label>
                <input id='occupied' name='status' type='radio' value='Occupied' />
                <label for='occupied'>Occupied</label>
              </div>
              <div className='button-set'>
                <button type='reset' className='filter_form_submit'>
                  Reset
                </button>
                <button className='filter_form_submit' onClick={(event) => this.props.matchingStartHandler(event)}>
                  Match!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter_form;

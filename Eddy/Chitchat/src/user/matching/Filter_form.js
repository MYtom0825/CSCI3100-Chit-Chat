import React from "react";
import "./Filter_form.css";

class Filter_form extends React.Component {
  constructor(props) {
    super(props);
  }

  university = ['CUHK', 'HKU', 'HKUST', 'CityU', 'PolyU', 'BU'];
  
  major = ['Science', 'Social Science', 'Engineering', 'Business'];

  render() {
    return (
      <div className='mission_1'>
        <div className='filter_form_grid_container'>
          <div className='filter_form_matching_intro'>
            <h2 className="filter_form_title">Welcome to the Matching Function!</h2>
            <p>You may pay tokens to add filter for your matching.</p>
            <br />
            <h3 className="filter_form_title">Charges are below:</h3>
            <br />
            <p>Basic Charge: 2 tokens</p>
            <br />
            <p>Gender:2 tokens</p>
            <br />
            <p>University: 2 tokens</p>
            <br />
            <p>Major: 2 tokens</p>
            <br />
            <p>Year: 2 tokens</p>
            <br />
            <p>Status: 3 tokens</p>
            <br />

            <h3 className="filter_form_title">Enjoy the Chat!</h3>
          </div>
          <div className='matching_form_holder'>
            <form className='matching_form'>
              <h1 className="filter_form_title">What kind of people do you want to look for?</h1>
              <div class='filter-form-radio-container'>
                <input id='Gender_M' name='gender' type='radio' value='Male' />
                <label for='Gender_M'>Male</label>
                <input id='Gender_F' name='gender' type='radio' value='Female' />
                <label for='Gender_F'>Female</label>
              </div>
              <label for='university'>University:</label>
              <select id='university' name='university'>
                <option value=''>University</option>
                {this.university.map((x) => (
                    <option value={x}>{x}</option>
                ))}
              </select>
              <label for='major'>Major:</label>
              <select id='major' name='major'>
                <option value=''>Major</option>
                {this.major.map((x) => (
                    <option value={x}>{x}</option>
                ))}
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

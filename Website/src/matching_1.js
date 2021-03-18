import "./matching_1.css";

const Matching_1 = (props) => {
  return (
    <div className="mission_1">
      <div className="grid_container">
        <div className="menu_bar"></div>
        <div className="matching_intro">
          <ul>
            <p>Welcome to the Matching Function!</p>
            <p>You may pay tokens to add filter for your matching.</p>
            <p>Charges are below:</p>
            <p>
              Basic Charge: 2 tokens
              <br />
              Gender:2 tokens
              <br />
              University: 2 tokens
              <br />
              Major: 2 tokens
              <br />
              Year: 2 tokens
              <br />
              Status: 3 tokens
              <br />
            </p>
          </ul>
          <p>Enjoy the Chat!</p>
        </div>
        <div className="matching_form_holder">
          <form className="matching_form">
            <h1>What kind of people do you want to look for?</h1>
            <label for="university">University:</label>
            <select id="university" name="university">
              <option value="">University</option>
              <option value="CUHK">CUHK</option>
              <option value="HKU">HKU</option>
              <option value="HKUST">HKUST</option>
              <option value="CityU">CityU</option>
              <option value="PolyU">PolyU</option>
              <option value="BU">BU</option>
            </select>
            <label for="major">Major:</label>
            <select id="major" name="major">
              <option value="">Major</option>
              <option value="Science">Science</option>
              <option value="Social Science">Social Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
            </select>
            <div class="radio-container">
              <input id="year1" name="year" type="radio" value="1" />
              <label for="year1">Year 1</label>
              <input id="year2" name="year" type="radio" value="2" />
              <label for="year2">Year 2</label>
              <input id="year3" name="year" type="radio" value="3" />
              <label for="year3">Year 3</label>
              <input id="year4+" name="year" type="radio" value="4+" />
              <label for="year4+">Year 4+</label>
            </div>
            <div class="radio-container">
              <input id="available" name="status" type="radio" value="A" />
              <label for="available">Available</label>
              <input id="occupied" name="status" type="radio" value="O" />
              <label for="occupied">Occupied</label>
            </div>
            <div className="button-set">
              <button type="reset" className="submit">
                Reset
              </button>
              <button className="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Matching_1;

import React, {Component} from 'react';
import "./ReportForm.css";



class Report_form extends React.Component{
    render(){
        
        return(
            <div className="report_form_container">
                <h1 type="report_heading">Report user</h1>
                <form>
                <div className="report_form_row">
                    <div className="report_form_cols_name">
                        <label >Reason</label>
                    </div>
                    <div className="report_form_cols_input">
                        <select  type="report_type" id="reason" name="reason">
                            <option type="report_reason" value="Nan"></option>
                            <option type="report_reason" value="il">Inproperate language</option>
                            <option type="report_reason" value="sex">Sexual harassment</option>
                        </select>        
                    </div>                    
                    
                </div>
                <div className="report_form_row">
                    <div className="report_form_cols_name">
                        <label>Description</label>
                    </div>
                    <div className="report_form_cols_input">

                        <textarea type="report_discription" 
                                style={{height:"200px"}}
                                placeholder="descript about the report..."></textarea>    
                    </div>                    
                </div>
                <div className="report_form_row">
                    <a type="submit" className="report_submit">Submit</a>
                </div>
                </form>
            </div>
        )
    }
}


export default Report_form
import React, { useState } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import DashboardService from "../services/DashboardService";
import Header from "./header";
import "../style/Signup.css";

function Profie() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    var [loading, setLoading] = useState(false);

    var enableSpinner = () => {
        loading = true;
        setLoading(loading) ;
    }
    
    var disableSpinner = () => {
        loading = false;
        setLoading(loading) ;
    }

    var [formdata, setFormData] = useState({
        "id": user.id,
        "full_name": user.full_name,
        "address_line_1": user.address_line_1,
        "address_line_2": user.address_line_2,
        "city": user.city,
        "state": user.state,
        "zip_code": user.zip_code,
    });
  
  const handleInputChange = e => {
		const { name, value } = e.target;
        switch(name){
            case "full_name":
                formdata.full_name = value;
                break;
            case "address_line_1":
                formdata.address_line_1 = value;
                break;
            case "address_line_2":
                formdata.address_line_2 = value;
                break;
            case "city":
                formdata.city = value;
                break;
            case "state":
                formdata.state = value;
                break;
            case "zip_code":
                formdata.zip_code = value;
                break;
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

  const submitProfileForm = (e) =>{
      e.preventDefault();

      if(formdata.full_name && formdata.address_line_1 && formdata.city && formdata.state && formdata.zip_code){
          enableSpinner();
          DashboardService.UpdateProfile(user.id, formdata)
          .then((res) => {
              let _data = res.data;
              console.log(_data);
              disableSpinner();
              localStorage.setItem('loggedInUser',JSON.stringify(res.data));
              NotificationManager.success('Success message', 'Profile updated successfully');
          })
          .catch((err) => {
              disableSpinner();
              NotificationManager.error('Error message', err.response.data.message);
          })
      }

      if(!formdata.full_name){
          NotificationManager.error('Error message', 'Name can not be blank');
      }
      
      if(!formdata.address_line_1){
          NotificationManager.error('Error message', 'Address line one can not be blank');
      }
      
      if(!formdata.city){
          NotificationManager.error('Error message', 'City can not be blank');
      }
      
      if(!formdata.state){
          NotificationManager.error('Error message', 'State can not be blank');
      }
      
      if(!formdata.zip_code){
          NotificationManager.error('Error message', 'Zip code can not be blank');
      }
  }

  return (
    <div>
        <Header/>

      {loading ? (
          <div id="overlay">
              <div className="cv-spinner">
                  <span className="spinner"></span>
              </div>
          </div>
      ) : (
          <span></span>
      )}

      <div className="d-flex justify-content-center align-items-center main_container">
        <div className="innerContainer row">
          <div className="col-md-12 justify-content-center align-items-center p-5">
            <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">Update Profile</h1>
              <form className="row" onSubmit={submitProfileForm}>
                <div className="col-md-6">
                    <label htmlFor="full_name" className="form-label">
                    Full Name
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    name="full_name"
                    placeholder="Full Name"
                    defaultValue={user.full_name}
                    required
                    onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="address_line_1" className="form-label">
                    Address Line One
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="address_line_1"
                    name="address_line_1"
                    defaultValue={user.address_line_1}
                    placeholder="Address Line One"
                    required
                    onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="address_line_2" className="form-label">
                    Address Line Two
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="address_line_2"
                    name="address_line_2"
                    defaultValue={user.address_line_2}
                    placeholder="Address Line Two"
                    required
                    onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                    City
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    defaultValue={user.city}
                    placeholder="City"
                    required
                    onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="state" className="form-label">
                    State
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    defaultValue={user.state}
                    placeholder="State"
                    required
                    onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="zip_code" className="form-label">
                    Zip Code
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="zip_code"
                    name="zip_code"
                    placeholder="Zip Code"
                    defaultValue={user.zip_code}
                    required
                    onChange={handleInputChange}
                    />
                </div>
                
                <div className="col-md-12 text-center">
                    <button type="button" className="btn btn-primary" onClick={submitProfileForm}>
                        Update Profile
                    </button>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationContainer/>

    </div>
  );
}

export default Profie;

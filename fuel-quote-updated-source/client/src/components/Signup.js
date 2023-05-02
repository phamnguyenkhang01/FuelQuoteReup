import React, { useState } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import AuthService from "../services/AuthService";

import "../style/Signup.css";
import signUpimg from '../img/flame-1208.png';
import Header from "./header";

function Signup() {
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
      "email": '',
      "password": '',
      "confirm_password": '',
  });
  
  const handleInputChange = e => {
		const { name, value } = e.target;
        switch(name){
            case "email":
                formdata.email = value;
                break;
            case "password":
                formdata.password = value;
                break;
            case "confirm_password":
                formdata.confirm_password = value;
                break;
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

  const submitRegisterForm = (e) =>{
      e.preventDefault();

      const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let validatedEmail = emailValidation.test(String(formdata.email).toLowerCase());

      if(formdata.email && validatedEmail && formdata && formdata.password && formdata.confirm_password){
          enableSpinner();
          AuthService.Register(formdata)
          .then((res) => {
              let _data = res.data;
              console.log(_data);
              localStorage.setItem('accessToken', _data.accessToken)
              localStorage.setItem('loggedInUser',JSON.stringify(res.data.user));

              disableSpinner();
              window.location.reload();
          })
          .catch((err) => {
              disableSpinner();
              NotificationManager.error('Error message', err.response.data.message);
          })
      }

      if(!formdata.email){
          NotificationManager.error('Error message', 'Email can not be blank');
      }else{
        if(!validatedEmail){
            NotificationManager.error('Error message', 'Please enter a validate email address');
        }
      }
      
      if(!formdata.password){
          NotificationManager.error('Error message', 'Password can not be blank');
      }

      if(formdata.password !== formdata.confirm_password){
				NotificationManager.error('Error message', 'The password and confirmation password do not match');
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
          <div className="col-6 d-flex flex-column justify-content-center align-items-center">
            <div>
              <h1>Signup</h1>
              <form onSubmit={submitRegisterForm}>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  onChange={handleInputChange}
                />

                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="********"
                  minLength={8}
                  required
                  onChange={handleInputChange}
                />

                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="********"
                  minLength={8}
                  required
                  onChange={handleInputChange}
                />

                <button type="button" className="btn btn-primary" onClick={submitRegisterForm}>
                  Signup
                </button>

              </form>
            </div>
          </div>

          <div className="col-6 d-flex flex-column justify-content-center align-items-center">
            <div>
              <img src={ signUpimg } alt="SignupImage"></img>
            </div>
            <div className="link">
              Already have account? <a className="link_" href="/login">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>

      <NotificationContainer/>

    </div>
  );
}

export default Signup;

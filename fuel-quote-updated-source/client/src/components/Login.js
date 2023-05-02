import React, { useState } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Header from "./header";

import '../style/Login.css';
import loginImg from '../img/login_illust.png';
import facebook from '../img/facebook.png';
import microsoft from '../img/microsoft.png';
import google from '../img/google.png';

import AuthService from "../services/AuthService";

function Login() {
  var [loading, setLoading] = useState(false);

  var enableSpinner = () => {
      loading = true;
      setLoading(loading) ;
  }
  
  var disableSpinner = () => {
      loading = false;
      setLoading(loading) ;
  }

  var error = '';
  var [formdata, setFormData] = useState({
    "email": '',
    "password": ''
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
            default:
                console.log("invalid");
        }
        setFormData(formdata) ;
	};

  const submitLoginForm = (e) =>{
    e.preventDefault();
    
    if(formdata.email && formdata.password){
        enableSpinner();
        AuthService.login(formdata)
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
    error = '';

    if(!formdata.email){
        error = "Email address can not be blank";
        NotificationManager.error('Error message', 'Email address can not be blank');
        console.log(error);
    }
    
    if(!formdata.password){
        error = "Password can not be blank";
        NotificationManager.error('Error message', 'Password can not be blank');
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
              <img src={ loginImg } alt="LoginImage" />
            </div>
            <div className="link">
              Don't have any account? <a className="link_" href="http://localhost:3000/sign-up">
                Create an account
              </a>
            </div>
          </div>
          <div className="col-6 d-flex flex-column justify-content-center align-items-center">
            <div>
              <h1>Login</h1>
              <form id="loginForm" onSubmit={submitLoginForm}>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email" id="email"
                  className="form-control"
                  placeholder="name@example.com"
                  name='email'
                  required
                  onChange={handleInputChange} 
                />
                { error? (<span>{error}</span>):(<span></span>) }
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password" id="password"
                  className="form-control"
                  placeholder="********"
                  name="password"
                  minLength={8}
                  required
                  onChange={handleInputChange}
                />
                <div className="checkBox">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                  </label>
                </div>
                
                <button type="button" className="btn btn-primary" onClick={submitLoginForm}>
                  Login
                </button>
              </form>
              <div className="otherLoginsDiv">
                <span>Or login with</span>
                <a href="http://localhost:3000/#">
                  <img className="icons firstIcon" src={ google } alt="google" />
                </a>
                <a href="http://localhost:3000/#">
                  <img className="icons" src={ facebook } alt="google" />
                </a>
                <a href="http://localhost:3000/#">
                  <img className="icons" src= { microsoft } alt="google" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationContainer/>

    </div>
  );
}

export default Login;

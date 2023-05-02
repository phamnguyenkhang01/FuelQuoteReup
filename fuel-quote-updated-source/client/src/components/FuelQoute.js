import React, {useEffect, useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Header from "./header";

import "../style/FuelQoute.css";
import fuelImg from "../img/spot-black-gold.png";
import DashboardService from "../services/DashboardService";

function FuelQoute() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  } 
    
  today = yyyy + '-' + mm + '-' + dd;

  var [loading, setLoading] = useState(false);
  var [get_quote_disabled, setGet_quote_disabled] = useState(true);
  var [submit_order_disabled, setSubmit_order_disabled] = useState(true);

  var enableSpinner = () => {
    loading = true;
    setLoading(loading) ;
  }

  var disableSpinner = () => {
    loading = false;
    setLoading(loading) ;
  }

  var [formdata, setFormData] = useState({
    "gallons": 5,
    "rate": "",
    "delivery_date": today,
    "delivery_address": user.address_line_1 + ' ' + user.address_line_2 + ' ' + user.city + ' ' + user.state + ' ' +user.zip_code,
    "quote_date": today,
    "total": ""
  });


  const handleInputChange = e => {
    const { name, value } = e.target;
    switch(name){
      case "gallons":
        formdata.gallons = value;
        setGet_quote_disabled(false);
        break;
      case "delivery_date":
        formdata.delivery_date = value;
        break;
      default:
        console.log("invalid");
    }
    setFormData(formdata) ;
  };

  const submitGetQuoteForm = (e) =>{
    e.preventDefault();

    if(formdata.gallons && formdata.delivery_date){
      enableSpinner();
      DashboardService.getRate(formdata)
          .then((res) => {console.log(formdata);
            console.log(res);
            formdata.rate = res.data.suggested_price;
            formdata.total = res.data.amount_due;

            setFormData(formdata);
            console.log(formdata);

            if(formdata.rate && formdata.total){
              setSubmit_order_disabled(false);
            }
            disableSpinner();

          })
          .catch((err) => {
            disableSpinner();
            NotificationManager.error('Error message', err.response.data.message);
          })
    }

    if(!formdata.gallons){
      NotificationManager.error('Error message', 'Gallons can not be blank');
    }

    if(!formdata.delivery_date){
      NotificationManager.error('Error message', 'Delivery Date can not be blank');
    }
  }

  const submitQuoteForm = (e) =>{
    e.preventDefault();

    if(formdata.gallons && formdata.delivery_date){
      enableSpinner();
      DashboardService.submitQuote(formdata)
          .then((res) => {

            disableSpinner();
            NotificationManager.success('Success message', 'Quote request submitted successfully');
            window.location.reload();
          })
          .catch((err) => {
            disableSpinner();
            NotificationManager.error('Error message', err.response.data.message);
          })
    }

    if(!formdata.gallons){
      NotificationManager.error('Error message', 'Gallons can not be blank');
    }

    if(!formdata.delivery_date){
      NotificationManager.error('Error message', 'Delivery Date can not be blank');
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

        <div className="d-flex justify-content-center fuelQouteMain">
          <div className="fuelQouteinner">
            <div className="row">
              <h2 className="qouteHeading">Fuel Quote</h2>
            </div>
            <div className="d-flex justify-content-center align-items-center row qouteRow">
              <div className="col-6">
                <form className="row" onSubmit={submitQuoteForm}>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="fuel_quantity" className="form-label">
                        <strong>Fuel (Gallons)</strong>
                      </label>
                      <input
                          type="number"
                          className="form-control"
                          id="fuel_quantity"
                          placeholder="Enter gallons you want to order"
                          min={1}
                          name="gallons"
                          onChange={handleInputChange}
                          required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label htmlFor="delivery_date" className="form-label">
                        <strong>Delivery Date</strong>
                      </label>
                      <input type="date" id="delivery_date" name="delivery_date" className="form-control"
                             defaultValue={today}
                             onChange={handleInputChange}
                             min={today} required/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label htmlFor="delivery_address" className="form-label">
                        <strong>Delivery Address</strong>
                      </label>
                      <div>
                        <span>{user.address_line_1}</span>
                      </div>
                      <div>
                        <span>{user.address_line_2}</span>
                      </div>
                      <div>
                        <span>{user.city}, {user.state} - {user.zip_code}</span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label htmlFor="rate" className="form-label">
                        <strong>Price Per Gallon</strong>
                      </label>
                      <input type="text" id="rate" name="rate" className="form-control" defaultValue={formdata.rate}
                             onChange={handleInputChange} readOnly={true}/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label htmlFor="total" className="form-label">
                        <strong>Total Amount Due</strong>
                      </label>
                      <input type="text" id="total" name="total" className="form-control" defaultValue={formdata.total}
                             onChange={handleInputChange} readOnly={true}/>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col col-md-6">
                      <button type="button" id="get_quote" className="btn btn-info " onClick={submitGetQuoteForm} disabled={get_quote_disabled}>
                        Get Quote
                      </button>
                    </div>
                    <div className="col col-md-6">
                      <button type="button" id="submit_order" className="btn btn-primary" onClick={submitQuoteForm} disabled={submit_order_disabled}>
                        Order
                      </button>
                    </div>
                  </div>
                </form>

              </div>
              <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                <div className="row">
                  <img className="fuelimg" src={fuelImg} alt="fuelImage"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NotificationContainer/>

      </div>

  );
}

export default FuelQoute;

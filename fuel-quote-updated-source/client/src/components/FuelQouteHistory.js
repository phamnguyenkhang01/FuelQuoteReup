import React, { useState, useEffect } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import "../style/FuelQouteHistory.css";

import Header from "./header";
import DashboardService from "../services/DashboardService";

function FuelQouteHistory() {
  var [loading, setLoading] = useState(false);
  var [quotes, setQuotes] = useState([]);

  var enableSpinner = () => {
    loading = true;
    setLoading(loading) ;
  }

  var disableSpinner = () => {
    loading = false;
    setLoading(loading) ;
  }
  useEffect(() => {
    getData();

    async function getData() {
      enableSpinner();
      await DashboardService.getQuotes()
          .then((res) => {
            setQuotes(res.data);

            disableSpinner();
          })
          .catch((err) => {
            disableSpinner();
            NotificationManager.error('Error message', err.response.data.message);
          })
    }
  }, []);


  return (
    <div>
      <Header/>

      <div>
        {loading ? (
            <div id="overlay">
              <div className="cv-spinner">
                <span className="spinner"></span>
              </div>
            </div>
        ) : (
            <span></span>
        )}

        <div className="d-flex justify-content-center align-items-center historyMain">
          <div className="table__ d-flex justify-content-center align-items-center flex-column">
            <div className="fuelhistoryheading">
              <h2>Quote History</h2>
            </div>
            <table className="table">
              <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Gallons</th>
                <th scope="col">Rate</th>
                <th scope="col">Delivery Address</th>
                <th scope="col">Delivery Date</th>
                <th scope="col">Quote Date</th>
                <th scope="col">Total</th>
              </tr>
              </thead>
              <tbody>
                {quotes.map((value, index) => {
                  return <tr key={index}>
                    <td>{index+1}</td>
                    <td>{value.gallons}</td>
                    <td>{value.rate}</td>
                    <td>{value.delivery_address}</td>
                    <td>{value.delivery_date}</td>
                    <td>{value.quote_date}</td>
                    <td>{value.gallons * value.rate }</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <NotificationContainer/>

    </div>
  );
}

export default FuelQouteHistory;

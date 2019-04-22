import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { monthlyRepayment } from './../commonFunctions.js';
import searchCarsByMonthlyPayments from '../../../services/searchCarsByMonthlyPayments';
import missingCarIcon from './../../../assets/car-icon.png';
import './affordableCars.scss';

class AffordableCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sentRequest: false,
      data: {
        searchResults: []
      },
    };
   }

  componentWillReceiveProps = (newProps) => {
    const repayment = monthlyRepayment(newProps.price, newProps.deposit, newProps.years);
    this.searchingCar(repayment);
  };

  searchingCar = async (price) => {
    this.setState({ loading: true, sentRequest: true });
    await searchCarsByMonthlyPayments(price).then((response)=>{
      this.setState({ data: response });
      this.setState({ loading: false });
    });
  };
  
  render = () => {
    const filteredCars = this.state.data.searchResults.filter(item => item.isReserved === false);
    const carResults = 
      <div className="content">
        <div className="row">
          {filteredCars.slice(0, 6).map((item, index) => 
            <div key={index} className="col-lg-4">
                <div className="card">
                  {
                    item.photos.length > 0
                    ? <img className="card-img-top" src={item.photos[0]} alt="Car"/>
                    : <img className="card-img-top" src={missingCarIcon} alt="Car"/>
                  }
                  <div className="card-body">
                    <h5 className="card-title">{item.title.name}</h5>
                    <ul className="card-text">
                      {
                        item.salesInfo.summary.slice(0, 7).map((item, index) =>
                          <li key={index}>{item}</li>
                        )
                      }
                    </ul>
                    {
                      item.salesInfo.pricing.monthlyPayment
                      ? <h4>£{item.salesInfo.pricing.monthlyPayment}/month</h4>
                      : ''
                    }
                    <Button variant="success" block href={`https://www.arnoldclark.com${item.url}`} target="_blank" rel="noopener noreferrer">
                      <b>Find More</b>
                    </Button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

    return (
      <div className="affordable-cars">
        <div className="container">
          {
            this.state.loading
            ? <div className="content text-center"><Loader type="Oval" color="#2C3637"/></div>
            : ''
          }
          {
            !this.state.loading 
            && this.state.sentRequest 
            ? <div><h3>Some affordable Cars</h3><hr/></div>
            : ''
          }
          {
            !this.state.loading 
            && this.state.sentRequest 
            && this.state.data.searchResults.length < 1
            ? <h1>No Results Found.</h1> 
            : ''
          }
          {
            !this.state.loading 
            && this.state.sentRequest 
            && this.state.data.searchResults.length > 1
            ? carResults
            : ''
          }
        </div> 
      </div>
    );
  }
}

export default AffordableCars;

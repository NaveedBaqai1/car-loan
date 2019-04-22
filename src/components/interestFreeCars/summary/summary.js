import React, { Component } from 'react';
import Moment from 'moment';
import { monthlyRepayment } from './../commonFunctions.js';
import './summary.scss';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
   }

  componentWillReceiveProps = (newProps) => {
    this.populateSummaryData(
      newProps.price, newProps.deposit,
      newProps.years, newProps.deliveryDate,
      newProps.arrangementFee, newProps.completionFee
    );
  }

  clearData = () => {
    this.setState({ data: [] });
  };

  populateSummaryData = (price, deposit, years, date, arrangementFee, completionFee) => {
    const monthsRequired = years * 12;
    this.clearData();
    for (let i = 1; i <= monthsRequired; i++) {
      this.setState(state => {
        state.data.push(
          {
            month: Moment(date).add(i, 'months').startOf('month').add(6 - Moment().day('Monday').day() ,'days').startOf('week').day(1).format("Do MMMM YYYY"),
            repayment: monthlyRepayment(price, deposit, years),
            arrangementFee: i === 1 ? parseFloat(arrangementFee) : 0,
            completionFee: i === monthsRequired ? parseFloat(completionFee): 0,
          }
        )
      });
    }
  };
  
  totalLoan = (price, deposit, fee) => {
    return parseFloat(((price - deposit) + fee).toFixed(2));
  };
  
  render = () => {
    const populateMonthlyRepayments = this.state.data.map((item, index) => 
      <div key={index}>
        <div className="card bg-light mb-3">
          <div className="card-header">
            <h4 className="card-title">{item.month}</h4>
          </div>
          <div className="card-body">
            <div>
              <span>Installement: </span>
              <b className="card-text">£{item.repayment}</b>
            </div>
            { item.arrangementFee !== 0 ?
              <div>
                <span>Arrangement Fee: </span>
                <b className="card-text">£{parseFloat(item.arrangementFee).toFixed(2)}</b>
              </div>
              : ''
            }
            { item.completionFee !== 0 ?
              <div>
                <span>Completion Fee: </span>
                <b className="card-text">£{parseFloat(item.completionFee).toFixed(2)}</b>
              </div>
              : ''
            }
            { item.arrangementFee === 0 && item.completionFee === 0 ?
              <div>
                <span className="card-text">No Extra Charges</span>
              </div>
              : ''
            }
          </div>
          <div className="card-footer">
            <div className="row flex">
              <span>Total:&nbsp;</span>
              <h5>
                £{parseFloat((item.repayment + item.arrangementFee + item.completionFee).toFixed(2))}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );

    const summaryData = 
      <div>
        <ul>
          <li>Payments are due on the first Monday of each month, beginning the month after delivery.</li>
          <li><b>£{parseFloat(this.props.arrangementFee).toFixed(2)}</b> arrangement fee will be charged and added to the first monthly payment.</li>
          <li><b>£{parseFloat(this.props.completionFee).toFixed(2)}</b> completion fee will be charged at the end of the loan term and added to the last monthly payment.</li>
          <li>Delivery Date: <b>{Moment(this.props.deliveryDate).format('Do MMMM YYYY')}</b></li>
          <li>Loan Amount: <b>£{(parseFloat(this.props.price)-parseFloat(this.props.deposit)).toFixed(2)}</b></li>
          <li>Deposit: <b>£{parseFloat(this.props.deposit).toFixed(2)}</b></li>
          <li>Number of monthly Repayments: <b>{this.props.years * 12}</b></li>
        </ul>
        <div className="total">
          £{this.totalLoan(this.props.price, this.props.deposit, (this.props.arrangementFee + this.props.completionFee)).toFixed(2)} <span>to be payed over </span> {this.props.years * 12} <span>months.</span>
        </div>
      </div>
    return (
      <div className="summary">
        { this.state.data.length > 0 ?
          <div className="container">
          <h3>Quote</h3>
          <hr/>
          <div className="row">
            <div className="col-md-6">
              <b>Monthly Repayments</b>
              <div className="repayments">
                {populateMonthlyRepayments}
              </div>
            </div>
            <div className="col-md-6 final-summary">
              <h4>Summary</h4>
              {summaryData}
            </div>
          </div>
          </div>
          : <div className="container text-center">
              <h3>Please enter the details to search the quote.</h3>
            </div>
        }
      </div>
    );
  }
}

export default Summary;

import React, { Component } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';
import addDays from 'date-fns/addDays';
import './search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      deposit: 0,
      years: 1,
      deliveryDate: addDays(new Date(), 1),
      priceError: false,
      depositError: false,
    };

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDepositChange = this.handleDepositChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }

  handleYearChange = (evt) => this.setState({ years: evt.target.value });
  handlePriceChange = (evt) => this.setState({ price: evt.target.value, priceError: false });
  handleDepositChange = (evt) => this.setState({ deposit: evt.target.value, depositError: false });
  handleDateChange = (date) => {
    this.setState({
      deliveryDate: date
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    await this.state.price === ''
    || parseFloat(this.state.price) <= 0
    ? this.setState({priceError: true})
    : this.setState({priceError: false});

    await this.state.deposit === ''
    || parseFloat(this.state.deposit) <= 0
    || parseFloat(this.state.price) <= 0
    || parseFloat(this.state.deposit) >= parseFloat(this.state.price)
    || ((this.state.deposit/this.state.price)*100) < 15
    ? this.setState({depositError: true})
    : this.setState({depositError: false});

    if (!this.state.priceError && !this.state.depositError) {
      const searches = {
        price: this.state.price,
        deposit: this.state.deposit,
        years: this.state.years,
        deliveryDate: Moment(this.state.deliveryDate).format(),
      }
      this.props.searches(searches);
    }
  }

  render() {
    return (
      <div className="search">
        <Form>
          <Form.Group>
            <Form.Label>Car Price</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text><b>£</b></InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='number'
                placeholder='10000'
                aria-describedby='inputGroupPrepend'
                required
                onChange={this.handlePriceChange}
              />
            </InputGroup>
            <div className="invalid-feedback d-block">
              {this.state.priceError ? 'Please enter the valid amount' : ''}
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Deposit</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text><b>£</b></InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='number'
                placeholder='1500'
                aria-describedby='inputGroupPrepend'
                required
                onChange={this.handleDepositChange}
              />
            </InputGroup>
            <div className="invalid-feedback d-block">
              {this.state.depositError ? 'Deposit should be lower than the price and atleast 15% of the price' : ''}
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>No. of Finance Years</Form.Label>
            <Form.Control as='select' 
              value={this.state.years}
              onChange={this.handleYearChange}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Delivery Date</Form.Label>
            <div>
              <DatePicker
                dateFormat='dd/MM/YYYY'
                minDate={addDays(new Date(), 1)}
                selected={this.state.deliveryDate}
                onChange={this.handleDateChange}
              />
            </div>
          </Form.Group>
          <Button variant='success' onClick={this.handleSubmit}>
            SEARCH
          </Button>
        </Form>
      </div>
    );
  }
}

export default Search;

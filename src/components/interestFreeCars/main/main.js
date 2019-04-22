import React, { Component } from 'react';
import Search from './../search/search';
import Summary from './../summary/summary';
import AffordableCars from './../affordableCars/affordableCars';
import addDays from 'date-fns/addDays';
import './main.scss';
import carImage from './../../../assets/car.png';

class Main extends Component {
  constructor(props) {
    super(props);
    this.reference = React.createRef();
    this.state = {
      arrangementFee: 88.00,
      completionFee: 20.00,
      price: 0,
      deposit: 0,
      years: 1,
      deliveryDate: addDays(new Date(), 1),
    };

    this.handleSearches = this.handleSearches.bind(this);
  }

  scrollToreference = () => {
    window.scrollTo({
        top: this.reference.offsetTop, 
        behavior: 'smooth'
    });
  };

  handleSearches = (search) => {
    this.setState({...search});
    this.scrollToreference();
  }

  render = () => {
    return (
      <main role="main" className="main">
        <header className="jumbotron">
            <div className="container text-center">
              <h2>We introduce a new interest free car loan scheme</h2>
                <div className="row flex-column-reverse flex-lg-row">
                  <div className="col-lg-5 text-left">
                    <Search searches={this.handleSearches}></Search>
                  </div>
                  <div className="col-lg-7 d-flex align-items-center justify-content-center">
                    <img className="car-image" src={carImage} alt="Car Logo"/>
                  </div>
                </div>
            </div>
          </header>
          <section className="py-4" ref={ (ref) => this.reference=ref }>
            <Summary 
              arrangementFee={this.state.arrangementFee}
              completionFee={this.state.completionFee}
              price={this.state.price}
              deposit={this.state.deposit}
              years={this.state.years}
              deliveryDate={this.state.deliveryDate}>
            </Summary>
          </section>
          <section className="py-4">
            <AffordableCars
              price={this.state.price}
              deposit={this.state.deposit}
              years={this.state.years}
            ></AffordableCars>
          </section>
      </main>
    );
  }
}

export default Main;

import React from 'react';
import Main from './main/Main';
import Search from './search/Search';
import Summary from './summary/Summary';
import AffordableCars from './affordableCars/affordableCars';
import { monthlyRepayment } from './commonFunctions.js';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Main Component Renders', () => {
  it('renders without crashing', () => {
     shallow(<Main />);
   });
});

describe('Search Component Renders', () => {
  it('renders without crashing', () => {
     shallow(<Search />);
   });
});

describe('Summary Component Renders', () => {
  it('renders without crashing', () => {
     shallow(<Summary />);
   });
});

describe('Affordable Cars Component Renders', () => {
  it('renders without crashing', () => {
     shallow(<AffordableCars />);
   });
});

describe('Total Loan Amount Test', () => {
  it('(100 - 15) + 100 = 185', () => {
    const wrapper = shallow(<Summary />);
    const func = wrapper.instance().totalLoan(100, 15, 100);
    expect(func).toBe(185);
  });
});

describe('Each Month Repayment', () => {
  it('(1000 - 150) / (3yrs * 12mnts) = 23.61', () => {
    const func = monthlyRepayment(1000, 150, 3);
    expect(func).toBe(23.61);
  });
});

describe('Clear Data', () => {
  it('expect state data array empty', () => {
    const wrapper = shallow(<Summary />);
    wrapper.setState({ data: [1, 2, 3] });
    expect(wrapper.state('data')).toEqual([1, 2, 3]);
    wrapper.instance().clearData();
    expect(wrapper.state('data')).toEqual([]);
  });
});

describe('Populate Data', () => {
  it('expect state data summary for qoute to be populated', () => {
    const date = Date.parse('Sun Apr 29 2019 11:58:42 GMT+0100 (British Summer Time)');
    const expectArray = [
      {month: '6th May 2019', repayment: 70.83, arrangementFee: 88, completionFee: 0},
      {month: '3rd June 2019', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '1st July 2019', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '5th August 2019', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '2nd September 2019', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '7th October 2019', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '4th November 2019', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '2nd December 2019', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '6th January 2020', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '3rd February 2020', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '2nd March 2020', repayment: 70.83, arrangementFee: 0, completionFee: 0},
      {month: '6th April 2020', repayment: 70.83, arrangementFee: 0, completionFee: 20},
    ]
    const wrapper = shallow(<Summary />);
    wrapper.setState({ data: [1, 2, 3] });
    expect(wrapper.state('data')).toEqual([1, 2, 3]);
    wrapper.instance().populateRepaymentData(1000, 150, 1, date, 88.00, 20.00);
    expect(wrapper.state('data')).toEqual(expectArray);
  });
});

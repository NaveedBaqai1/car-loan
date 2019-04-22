import axios from 'axios'

export default (price) => {
  const URL = `https://cors-anywhere.herokuapp.com/https://www.arnoldclark.com/used-cars/search.json?payment_type=monthly&min_price=0&max_price=${price}&sort_order=monthly_payment_up`;
  return axios.get(URL)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

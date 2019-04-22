export function monthlyRepayment(price, deposit, years) {
  const priceAfterDeposit = price - deposit;
  const totalMonths = years * 12;
  return parseFloat((priceAfterDeposit/totalMonths).toFixed(2));
};

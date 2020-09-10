/** Returns the monthly payment, rounded to the nearest cent, when given the loan amount,
 *  term in months, and annual interest rate.
 */

function monthlyPayment(loanAmount, termInMonths, interestRate) {
  if (interestRate === 0) {
    return loanAmount / termInMonths;
  }
  const monthlyInterestRate = interestRate / 12;
  const compoundedInterest = Math.pow(1 + monthlyInterestRate, termInMonths);
  return (
    Math.round(
      (100 * loanAmount * monthlyInterestRate * compoundedInterest) /
        (compoundedInterest - 1)
    ) / 100
  );
}

module.exports = monthlyPayment;

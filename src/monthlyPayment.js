/* The following formula is used to calculate the fixed monthly payment (P) required to fully amortize
a loan of L dollars over a term of n months at a monthly interest rate of c.
[If the quoted rate is 6%, for example, c is .06/12 or .005].*/

// P = L[c(1 + c)^n]/[(1 + c)^n - 1]

function monthlyPayment(loanAmount,termInMonths,interestRate) {
    if (interestRate == 0) {
        return loanAmount / termInMonths
    }
    const monthlyInterestRate = interestRate / 12
    const compoundedInterest = Math.pow(1 + monthlyInterestRate,termInMonths)
    return Math.round(100 * loanAmount * monthlyInterestRate * compoundedInterest / (compoundedInterest - 1)) / 100
}

module.exports = monthlyPayment
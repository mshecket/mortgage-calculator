import React, { useState } from "react"
import monthlyPayment from "./monthlyPayment"

function App() {
    const [loanAmount, setLoanAmount] = useState(0)
    const [termInMonths, setTermInMonths] = useState(1)
    const [interestRate, setInterestRate] = useState(0)

    const handleChange = (event) => {
        switch (event.target.name) {
            case "loanAmount":
                setLoanAmount(event.target.value)
                break
            case "termInMonths":
                setTermInMonths(event.target.value)
                break
            case "interestRate":
                setInterestRate(event.target.value)
        }

    }

    const currencyFormat = (amount) => amount.toLocaleString('en-US',{
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    return (
        <div>
            <label id="loanAmountLabel">Loan Amount</label>
            <input type="text" name="loanAmount" id="loanAmount" onChange={handleChange} value={loanAmount}></input>
            <br/>
            <label id="termInMonthsLabel">Term In Months</label>
            <input type="text" name="termInMonths" id="termInMonths" onChange={handleChange} value={termInMonths}></input>
            <br/>
            <label id="interestRateLabel">Interest Rate</label>
            <input type="text" name="interestRate" id="interestRate" onChange={handleChange} value={interestRate}></input>
            <br/>
            <label id="monthlyPaymentLabel">Monthly Payment</label>
            <div id="output">
                {currencyFormat(monthlyPayment(loanAmount,termInMonths,interestRate/100))}
            </div>
        </div>
    )
}

export default App
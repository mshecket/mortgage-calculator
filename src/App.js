import React, { useState } from "react"
import Switch from '@material-ui/core/Switch'
import monthlyPayment from "./monthlyPayment"
import validateDollarAmount from "./validateDollarAmount"

function App() {
    const [loanAmount, setLoanAmount] = useState(0)
    const [loanTerm, setLoanTerm] = useState(1)
    const [interestRate, setInterestRate] = useState(0)
    const [monthsOrYears, setMonthsOrYears] = useState(true)

    const handleChange = (event) => {
        switch (event.target.name) {
            case "loanAmount":
                setLoanAmount(validateDollarAmount(event.target.value))
                break
            case "loanTerm":
                setLoanTerm(event.target.value)
                break
            case "interestRate":
                setInterestRate(event.target.value)
                break
            case "monthsOrYears":
                setMonthsOrYears(event.target.value)
        }

    }

    const handleSwitch = (event) => {
        setMonthsOrYears(!monthsOrYears)
    }

    const currencyFormat = (amount) => amount.toLocaleString('en-US',{
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    return (
        <div id="mainContent">
            <label id="loanAmountLabel">Loan Amount</label>
            <input type="text" name="loanAmount" id="loanAmount" onChange={handleChange} value={currencyFormat(loanAmount)}></input>
            <br/>
            <label id="loanTermLabel">Loan Term</label>
            <span id="monthsOrYearsSelection">
                <label id="monthsLabel" style={{ color: monthsOrYears ? "gray" : "black"}}>Months</label>
                <Switch id="monthsOrYears"
                    onClick={handleSwitch}
                    onChange={handleChange} // This is just for testing purposes
                    checked={monthsOrYears} 
                    value={monthsOrYears}
                    color="primary"
                    size="small">
                </Switch>
                <label id="yearsLabel" style={{ color: monthsOrYears ? "black" : "gray"}}>Years</label>
            </span>
            <input type="text" name="loanTerm" id="loanTerm" onChange={handleChange} value={loanTerm}></input>
            <br/>
            <label id="interestRateLabel">Interest Rate</label>
            <input type="text" name="interestRate" id="interestRate" onChange={handleChange} value={interestRate}></input>
            <br/>
            <label id="monthlyPaymentLabel">Monthly Payment</label>
            <div id="output">
                {currencyFormat(monthlyPayment(loanAmount,monthsOrYears ? (loanTerm * 12) : loanTerm,interestRate/100))}
            </div>
        </div>
    )
}

export default App
import React, { useState } from "react"
import Switch from '@material-ui/core/Switch'
import monthlyPayment from "./monthlyPayment"
import validateDollarAmount from "./validateDollarAmount"
import validateLoanTerm from "./validateLoanTerm"
import validateInterestRate from "./validateInterestRate"

function App() {
    const [loanAmount, setLoanAmount] = useState(0)
    const [loanTerm, setLoanTerm] = useState(1)
    const [interestRate, setInterestRate] = useState(0)
    const [monthsOrYears, setMonthsOrYears] = useState(true)

    const handleChange = (event) => {
        switch (event.target.name) {
            case "loanAmount":
                setLoanAmount(event.target.value)
                break
            case "loanTerm":
                setLoanTerm(event.target.value)
                if (event.target.value.toLowerCase().includes("m")) // Not currently active due to input validation
                    setMonthsOrYears(false)
                else if (event.target.value.toLowerCase().includes("y"))
                    setMonthsOrYears(true)
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
            <input
                type="number"
                min="0"
                max="1000000000000"
                name="loanAmount"
                id="loanAmount"
                onChange={handleChange}
                value={loanAmount}>
            </input>
            <br/>
            <label id="loanTermLabel">Loan Term</label>
            <span id="monthsOrYearsSelection">
                <label id="monthsLabel" style={{ color: monthsOrYears ? "#999" : "white"}}>Months</label>
                <Switch id="monthsOrYears"
                    onClick={handleSwitch}
                    onChange={handleChange} // This is just for testing purposes
                    checked={monthsOrYears} 
                    value={monthsOrYears}
                    color="primary"
                    size="small">
                </Switch>
                <label id="yearsLabel" style={{ color: monthsOrYears ? "white" : "#999"}}>Years</label>
            </span>
            <input
                type="number"
                min="1"
                max="1000000000"
                step="1"
                name="loanTerm"
                id="loanTerm"
                onChange={handleChange}
                value={loanTerm}>
            </input>
            <br/>
            <label id="interestRateLabel">Interest Rate (%)</label>
            <input
                type="number"
                min="0"
                max="10000"
                name="interestRate"
                id="interestRate"
                onChange={handleChange}
                value={interestRate}>
            </input>
            <br/>
            <label id="monthlyPaymentLabel">Monthly Payment</label>
            <div id="output">
                {currencyFormat(monthlyPayment(validateDollarAmount(loanAmount),
                monthsOrYears ? (validateLoanTerm(loanTerm) * 12) : validateLoanTerm(loanTerm),validateInterestRate(interestRate)/100))}
            </div>
        </div>
    )
}

export default App
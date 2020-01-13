import React, { useState } from "react"
import Switch from '@material-ui/core/Switch'
import monthlyPayment from "./monthlyPayment"
import validateDollarAmount from "./validateDollarAmount"
import validateLoanTerm from "./validateLoanTerm"
import validateInterestRate from "./validateInterestRate"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faPercentage} from '@fortawesome/free-solid-svg-icons'

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
                break
            default:
                console.log("No match for event")
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
            <label id="loanAmountLabel">Loan Amount  <FontAwesomeIcon
                id="house"
                className="icon"
                icon={faHome}
                style={{transform: 'scale(' + Math.min(1.2,Math.max(.5,Math.log(loanAmount / 100000))) + ')'}}/>
            </label>
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
            <label id="loanTermLabel">Loan Term  <FontAwesomeIcon
                id="calendar"
                className="icon"
                icon={monthsOrYears ? faCalendar : faCalendarAlt}
                style={{transform: 'scale(' + Math.min(1.2,Math.max(.5,Math.log(monthsOrYears ? (validateLoanTerm(loanTerm) * 12) / 180 : validateLoanTerm(loanTerm) / 10))) + ')'}}/>
            </label>
            <span id="monthsOrYearsSelection">
                <label id="monthsLabel" style={{ color: monthsOrYears ? "#aaa" : "white"}}>Months</label>
                <Switch id="monthsOrYears"
                    onClick={handleSwitch}
                    onChange={handleChange} // This is just for testing purposes
                    checked={monthsOrYears} 
                    value={monthsOrYears}
                    color="primary">
                </Switch>
                <label id="yearsLabel" style={{ color: monthsOrYears ? "white" : "#aaa"}}>Years</label>
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
            <label id="interestRateLabel">Interest Rate  <FontAwesomeIcon
                id="percent"
                className="icon"
                icon={faPercentage}
                style={{transform: 'scale(' + Math.min(1.2,Math.max(.5,Math.log(interestRate / 2.5))) + ')'}}/>
            </label>
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
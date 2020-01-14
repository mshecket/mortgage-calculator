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
                break
        }

    }

    const handleSwitch = (event) => {
        setMonthsOrYears(!monthsOrYears)
    }

    const handleMonths = (event) => {
        setMonthsOrYears(false)
    }

    const handleYears = (event) => {
        setMonthsOrYears(true)
    }

    const currencyFormat = (amount) => amount.toLocaleString('en-US',{
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    return (
        <div id="mainContent">
            <label id="loanAmountLabel" for="loanAmount">Loan Amount   <FontAwesomeIcon
                id="house"
                className="icon"
                icon={faHome}
                style={{transform: 'scale(' + Math.min(1.25,Math.max(.4,
                Math.pow(Math.log(loanAmount === 0 ? 1 : loanAmount)/12.0,1.75)
                )
                ) + ')'}}/>
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
            <label id="loanTermLabel" for="loanTerm">Loan Term   <FontAwesomeIcon
                id="calendar"
                className="icon"
                icon={monthsOrYears ? faCalendar : faCalendarAlt}
                style={{transform: 'scale(' +
                Math.min(1.25,
                    Math.max(.4,
                        Math.pow(
                        (Math.log(1 + (monthsOrYears ? validateLoanTerm(loanTerm) : validateLoanTerm(loanTerm) / 12)))
                        /3.434,
                        1.5)
                    )
                )
                + ')'}}/>
            </label>
            <span id="monthsOrYearsSelection">
                <label id="monthsLabel" onClick={handleMonths} style={{ color: monthsOrYears ? "#aaa" : "white"}}>Months</label>
                <Switch id="monthsOrYears"
                    onClick={handleSwitch}
                    onChange={handleChange} // This is just for testing purposes
                    checked={monthsOrYears} 
                    value={monthsOrYears}
                    color="primary">
                </Switch>
                <label id="yearsLabel" onClick={handleYears} style={{ color: monthsOrYears ? "white" : "#aaa"}}>Years</label>
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
            <label id="interestRateLabel" for="interestRate">Interest Rate   <FontAwesomeIcon
                id="percent"
                className="icon"
                icon={faPercentage}
                style={{transform: 'scale(' +
                Math.min(1.25,
                    Math.max(.4,
                            Math.log(interestRate === 0 ? 1 : 1 + interestRate / 3.5)
                            )
                        )
                + ')'}}/>
            </label>
            <input
                type="number"
                min="0"
                max="100"
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
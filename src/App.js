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

    return (
        <div>
            <input type="text" name="loanAmount" id="loanAmount" onChange={handleChange} value={loanAmount}></input>
            <input type="text" name="termInMonths" id="termInMonths" onChange={handleChange} value={termInMonths}></input>
            <input type="text" name="interestRate" id="interestRate" onChange={handleChange} value={interestRate}></input>
            <div id="output">
                {monthlyPayment(loanAmount,termInMonths,interestRate/100).toLocaleString('en-US',{
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </div>
        </div>
    )
}

export default App
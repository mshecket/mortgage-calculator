import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import monthlyPayment from "./monthlyPayment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(1);
  const [interestRate, setInterestRate] = useState(0);
  const [monthsOrYears, setMonthsOrYears] = useState(true);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "loanAmount":
        setLoanAmount(event.target.value);
        break;
      case "loanTerm":
        setLoanTerm(event.target.value);
        break;
      case "interestRate":
        setInterestRate(event.target.value);
        break;
      case "monthsOrYears":
        setMonthsOrYears(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSwitch = (event) => {
    setMonthsOrYears(!monthsOrYears);
  };

  const handleMonths = (event) => {
    setMonthsOrYears(false);
  };

  const handleYears = (event) => {
    setMonthsOrYears(true);
  };

  const currencyFormat = (amount) =>
    amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div
        id="mainContent"
        className="w-full h-full lg:h-auto lg:w-auto bg-blue-400 text-blue-100 m-4 p-16 flex flex-col items-center justify-center font-sans shadow-md rounded-lg"
      >
        <label htmlFor="loanAmount" id="loanAmountLabel">
          Loan Amount{" "}
          <FontAwesomeIcon
            id="house"
            className="icon"
            icon={faHome}
            style={{
              transform:
                "scale(" +
                Math.min(
                  1.25,
                  Math.max(
                    0.5,
                    Math.pow(
                      Math.log(loanAmount === 0 ? 1 : loanAmount) / 12.0,
                      1.75
                    )
                  )
                ) +
                ")",
            }}
          />
        </label>
        <input
          type="number"
          min="0"
          max="1000000000000"
          name="loanAmount"
          id="loanAmount"
          onChange={handleChange}
          value={loanAmount}
        ></input>
        <br />
        <label id="loanTermLabel" htmlFor="loanTerm">
          Loan Term{" "}
          <FontAwesomeIcon
            id="calendar"
            className="icon"
            icon={monthsOrYears ? faCalendar : faCalendarAlt}
            style={{
              transform:
                "scale(" +
                Math.min(
                  1.25,
                  Math.max(
                    0.5,
                    Math.pow(
                      Math.log(
                        1 + (monthsOrYears ? loanTerm : loanTerm / 12.0)
                      ) / 3.434,
                      1.5
                    )
                  )
                ) +
                ")",
            }}
          />
        </label>
        <span
          id="monthsOrYearsSelection"
          className="flex items-end justify-center"
        >
          <label
            id="monthsLabel"
            onClick={handleMonths}
            className={"text-gray-" + (monthsOrYears ? "700" : "100")}
          >
            Months
          </label>
          <Switch
            id="monthsOrYears"
            onClick={handleSwitch}
            onChange={handleChange} // For testing purposes
            checked={monthsOrYears}
            value={monthsOrYears}
            color="primary"
          ></Switch>
          <label
            id="yearsLabel"
            onClick={handleYears}
            className={"text-gray-" + (monthsOrYears ? "100" : "700")}
          >
            Years
          </label>
        </span>
        <input
          type="number"
          min="1"
          max="1000000000"
          step="1"
          name="loanTerm"
          id="loanTerm"
          onChange={handleChange}
          value={loanTerm}
        ></input>
        <br />
        <label id="interestRateLabel" htmlFor="interestRate">
          Interest Rate{" "}
          <FontAwesomeIcon
            id="percent"
            className="icon"
            icon={faPercentage}
            style={{
              transform:
                "scale(" +
                Math.min(
                  1.25,
                  Math.max(
                    0.5,
                    Math.log(interestRate === 0 ? 1 : 1 + interestRate / 3.5)
                  )
                ) +
                ")",
            }}
          />
        </label>
        <input
          type="number"
          min="0"
          max="100"
          name="interestRate"
          id="interestRate"
          onChange={handleChange}
          value={interestRate}
        ></input>
        <br />
        <label id="monthlyPaymentLabel">Monthly Payment</label>
        <div id="monthlyPaymentOutput" className="text-4xl">
          {currencyFormat(
            monthlyPayment(
              loanAmount,
              monthsOrYears ? loanTerm * 12 : loanTerm,
              interestRate / 100
            )
          )}
        </div>
        <label className="border-t" id="totalPaymentLabel">
          Total Payment
        </label>
        <div id="totalPaymentOutput" className="text-4xl">
          {currencyFormat(
            (monthsOrYears ? loanTerm * 12 : loanTerm) *
              monthlyPayment(
                loanAmount,
                monthsOrYears ? loanTerm * 12 : loanTerm,
                interestRate / 100
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

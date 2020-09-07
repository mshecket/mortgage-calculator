import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import monthlyPayment from "./monthlyPayment";
import validateDollarAmount from "./validateDollarAmount";
import validateInterestRate from "./validateInterestRate";
import validateLoanTerm from "./validateLoanTerm";
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
        setLoanAmount(
          Math.min(
            1000000000,
            Math.max(0, Math.abs(parseFloat(event.target.value)))
          )
        );
        break;
      case "loanTerm":
        setLoanTerm(
          Math.min(5000, Math.max(0, Math.abs(parseInt(event.target.value))))
        );
        break;
      case "interestRate":
        setInterestRate(
          Math.min(500, Math.max(0, Math.abs(parseFloat(event.target.value))))
        );
        break;
      case "monthsOrYears":
        setMonthsOrYears(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSwitch = () => {
    setMonthsOrYears(!monthsOrYears);
  };

  const handleMonths = () => {
    setMonthsOrYears(false);
  };

  const handleYears = () => {
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
        className="w-full h-full md:h-auto md:w-auto bg-blue-400 text-blue-100 m-4 p-16 flex flex-col items-center justify-center font-sans md:rounded-lg md:shadow-lg space-y-1"
      >
          <h1 className="text-5xl font-bold font-sans border-b w-full text-center pb-5">Mortgage Calculator</h1>
        <div id="entryBoxes" className="flex flex-col md:flex-row md:flex-wrap">
          <div
            id="loanAmountBox"
            className="flex flex-col w-full md:w-1/3 h-auto justify-between items-center border-b md:border-r md:border-b-0 p-4"
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
                          Math.log(
                            loanAmount === 0 ? 1 : (loanAmount * 1.0) / 12.0
                          ),
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
          </div>
          <div
            id="loanTermBox"
            className="flex flex-col w-full md:w-1/3 h-auto justify-between items-center border-b md:border-r md:border-b-0 p-4"
          >
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
                            1.0 +
                              (monthsOrYears
                                ? validateLoanTerm(loanTerm * 1.0)
                                : validateLoanTerm(loanTerm * 1.0) / 12)
                          ) / 3.434,
                          1.5
                        )
                      )
                    ) +
                    ")",
                }}
              />
            </label>
            <div
              id="monthsOrYearsSelection"
              className="flex flex-row items-end justify-center w-full"
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
            </div>
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
          </div>
          <div
            id="interestRateBox"
            className="flex flex-col w-auto md:w-1/3 h-auto justify-between items-center p-4"
          >
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
                        Math.log(
                          validateInterestRate(interestRate) === 0
                            ? 1
                            : 1 + validateInterestRate(interestRate) / 3.5
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
              max="100"
              name="interestRate"
              id="interestRate"
              onChange={handleChange}
              value={interestRate}
            ></input>
          </div>
        </div>
        <div
          id="outputBox"
          className="flex flex-col w-full justify-center items-center bg-blue-500 rounded-lg p-4 m-4"
        >
          <label id="monthlyPaymentLabel">Monthly Payment</label>
          <div id="monthlyPaymentOutput" className="text-4xl select-all">
            {currencyFormat(
              monthlyPayment(
                validateDollarAmount(loanAmount),
                monthsOrYears
                  ? validateLoanTerm(loanTerm) * 12
                  : validateLoanTerm(loanTerm),
                validateInterestRate(interestRate) / 100
              )
            )}
          </div>
          <label className="border-t" id="totalPaymentLabel">
            Total Payment
          </label>
          <div id="totalPaymentOutput" className="text-4xl select-all">
            {currencyFormat(
              (monthsOrYears ? loanTerm * 12 : loanTerm) *
                monthlyPayment(
                  validateDollarAmount(loanAmount),
                  monthsOrYears
                    ? validateLoanTerm(loanTerm) * 12
                    : validateLoanTerm(loanTerm),
                  validateInterestRate(interestRate) / 100
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

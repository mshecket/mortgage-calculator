import React from 'react'
import App from '../src/App'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

const component = shallow(<App />)

test('There is a component called App', () => {
    expect(component).toBeDefined()
})

test('There is an input field with id "loanAmount"', () => {
    expect(component.find("#loanAmount")).toHaveLength(1)
})

test('There is an input field with id "loanTerm"', () => {
    expect(component.find("#loanTerm")).toHaveLength(1)
})

test('There is a switch component with id "monthsOrYears"', () => {
    expect(component.find("#monthsOrYears")).toHaveLength(1)
})

test('There is an input field with id "interestRate"', () => {
    expect(component.find('#interestRate')).toHaveLength(1)
})

test('There is a div with id "output"', () => {
    expect(component.find('#output')).toHaveLength(1)
})

test('The loan amount input has a label with the text "Loan Amount"', () => {
    expect(component.find('label#loanAmountLabel').text()).toEqual(expect.stringContaining("Loan Amount"))
})

test('The loan term input has a label with the text "Loan Term"', () => {
    expect(component.find('label#loanTermLabel').text()).toEqual(expect.stringContaining("Loan Term"))
})

test('The months/years switch has two labels with the text "Months" and "Years"', () => {
    expect(component.find('label#monthsLabel').text()).toEqual("Months")
    expect(component.find('label#yearsLabel').text()).toEqual("Years")
})

test('There is a span with id "monthsOrYearsSelection"', () => {
    expect(component.find('#monthsOrYearsSelection')).toHaveLength(1)
})

test('The interest rate input has a label with the text "Interest Rate (%)"', () => {
    expect(component.find('label#interestRateLabel').text()).toEqual(expect.stringContaining("Interest Rate"))
})

test('The output field has a label with the text "Monthly Payment"', () => {
    expect(component.find('label#monthlyPaymentLabel').text()).toEqual("Monthly Payment")
})

test('There is a FontAwesomeIcon with ID "house"', () => {
    expect(component.find('FontAwesomeIcon#house')).toHaveLength(1)
})

test('There is a FontAwesomeIcon with ID "calendar"', () => {
    expect(component.find('FontAwesomeIcon#calendar')).toHaveLength(1)
})

test('There is a FontAwesomeIcon with ID "percent"', () => {
    expect(component.find('FontAwesomeIcon#percent')).toHaveLength(1)
})

test('When loan amount set to $0, term set to 360 months, and rate set to 6% interest, output display shows $0.00', () => {
    component.find('#loanAmount').simulate("change", { target: { name: "loanAmount", value: "0" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "360" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: false}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "6" }})
    expect(component.find('#output').text()).toEqual("$0.00")
})

test('When loan amount set to $1, term set to 1 month, and rate set to 0% interest, output display shows $1.00', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "1" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "1" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: false}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "0" }})
    expect(component.find('#output').text()).toEqual("$1.00")
})

test('When loan amount set to $100, term set to 100 months, and rate set to 0% interest, output display shows $1.00', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "100" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: false}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "0" }})
    expect(component.find('#output').text()).toEqual("$1.00")
})

test('When loan amount set to $100,000, term set to 360 months, and rate set to 6% interest, output display shows $599.55', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "360" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: false}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "6" }})
    expect(component.find('#output').text()).toEqual("$599.55")
})

test('When loan amount set to $500,000, term set to 36 months, and rate set to 50%, output display shows $27,056.96', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "500000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "36" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: false}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "50" }})
    expect(component.find('#output').text()).toEqual("$27,056.96")
})

test('When loan amount set to "a million bucks", term set to 36 months, and rate set to 50%, output display shows $0.00', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "a million bucks" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "36" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: false}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "50" }})
    expect(component.find('#output').text()).toEqual("$0.00")
})

test('When loan amount set to "a million bucks, meaning $1,000,000", term set to 36 months, and rate set to 50%, output display shows $54,113.91', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "a million bucks, meaning $1,000,000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "36" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: false}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "50" }})
    component.find('#loanAmount').simulate("onblur")
    expect(component.find('#output').text()).toEqual("$54,113.91")
})

test('When loan amount set to "a million bucks, meaning $1,000,000", term set to "36 months", and rate set to 50%, output display shows $54,113.91', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "a million bucks, meaning $1,000,000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "36 months" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "50" }})
    component.find('#loanAmount').simulate("onblur")
    expect(component.find('#output').text()).toEqual("$54,113.91")
})

test('When loan amount set to $1, term set to 1 year, and rate set to 0% interest, output display shows $0.08', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "1" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "1" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: true}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "0" }})
    expect(component.find('#output').text()).toEqual("$0.08")
})

test('When loan amount set to $100, term set to 100 years, and rate set to 0% interest, output display shows $0.08', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "100" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: true}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "0" }})
    expect(component.find('#output').text()).toEqual("$0.08")
})

test('When loan amount set to $100,000, term set to 30 years, and rate set to 5% interest, output display shows $536.82', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "30" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: true}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "5" }})
    expect(component.find('#output').text()).toEqual("$536.82")
})

test('When loan amount set to $100,000, term set to 30.00 years, and rate set to 5% interest, output display shows $536.82', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "30.00" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: true}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "5" }})
    expect(component.find('#output').text()).toEqual("$536.82")
})

test('When loan amount set to $100,000, term set to "^^30.00" years, and rate set to 5% interest, output display shows $536.82', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "^^30.00" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: true}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "5" }})
    expect(component.find('#output').text()).toEqual("$536.82")
})


test('When loan amount set to $100,000, term set to "thirty" years, and rate set to 5% interest, output display shows $536.82', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "thirty" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: true}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "5" }})
    expect(component.find('#output').text()).toEqual("$8,560.75")
})

test('When loan amount set to $100,000, term set to "360 months", and rate set to 5% interest, output display shows $536.82', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "360 months" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "5" }})
    expect(component.find('#output').text()).toEqual("$536.82")
})

test('When loan amount set to $100,000, term set to 30 years, and rate set to "5.00%" interest, output display shows $536.82', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "30" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: true}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "5.00%" }})
    expect(component.find('#output').text()).toEqual("$536.82")
})

test('When loan amount set to $100,000, term set to 30 years, and rate set to "4.9999 percent" interest, output display shows $536.82', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#loanTerm').simulate("change", { target: { name: "loanTerm", value: "30" }})
    component.find('#monthsOrYears').simulate("change", { target: { name: "monthsOrYears", value: true}})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "4.9999 percent" }})
    expect(component.find('#output').text()).toEqual("$536.82")
})
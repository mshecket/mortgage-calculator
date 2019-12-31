// Write tests for app here
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

test('There is an input field with id "termInMonths"', () => {
    expect(component.find("#termInMonths")).toHaveLength(1)
})

test('There is an input field with id "interestRate"', () => {
    expect(component.find('#interestRate')).toHaveLength(1)
})

test('There is a div with id "output"', () => {
    expect(component.find('#output')).toHaveLength(1)
})

test('The loan amount input has a label with the text "Loan Amount"', () => {
    expect(component.find('label#loanAmountLabel').text()).toEqual("Loan Amount")
})

test('The term in months input has a label with the text "Term In Months"', () => {
    expect(component.find('label#termInMonthsLabel').text()).toEqual("Term In Months")
})

test('The interest rate input has a label with the text "Interest Rate"', () => {
    expect(component.find('label#interestRateLabel').text()).toEqual("Interest Rate")
})

test('The output field has a label with the text "Monthly Payment"', () => {
    expect(component.find('label#monthlyPaymentLabel').text()).toEqual("Monthly Payment")
})

test('When loan amount set to $0, term set to 360 months, and rate set to 6% interest, output display shows $0.00', () => {
    component.find('#loanAmount').simulate("change", { target: { name: "loanAmount", value: "0" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "360" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "6" }})
    expect(component.find('#output').text()).toEqual("$0.00")
})

test('When loan amount set to $1, term set to 1 month, and rate set to 0% interest, output display shows $1.00', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "1" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "1" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "0" }})
    expect(component.find('#output').text()).toEqual("$1.00")
})

test('When loan amount set to $100, term set to 100 months, and rate set to 0% interest, output display shows $1.00', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "100" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "0" }})
    expect(component.find('#output').text()).toEqual("$1.00")
})

test('When loan amount set to $100,000, term set to 360 months, and rate set to 6% interest, output display shows $599.55', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "360" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "6" }})
    expect(component.find('#output').text()).toEqual("$599.55")
})

test('When load amount set to $500,000, term set to 36 months, and rate set to 50%, output display shows $27,056.96', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "500000" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "36" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "50" }})
    expect(component.find('#output').text()).toEqual("$27,056.96")
})
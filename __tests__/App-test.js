// Write tests for app here
import React from 'react'
import renderer from 'react-test-renderer'
import App from '../src/App'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

const component = shallow(<App />)
// TEST: App exists
test('There is a component called App', () => {
    expect(component).toBeDefined()
})

// TEST: App has a way to enter a loan amount
test('There is an input field with id "loanAmount"', () => {
    expect(component.find("#loanAmount")).toHaveLength(1)
})

// TEST: App has a way to enter a loan term
test('There is an input field with id "termInMonths"', () => {
    expect(component.find("#termInMonths")).toHaveLength(1)
})

// TEST: App has a way to enter an interest rate
test('There is an input field with id "interestRate"', () => {
    expect(component.find('#interestRate')).toHaveLength(1)
})

// TEST: App has an output display for monthly payment
test('There is a div with id "output"', () => {
    expect(component.find('#output')).toHaveLength(1)
})

// TEST: When loan amount set to $0, term set to 360 months, and rate set to 6% interest, output display shows $0.00
test('When loan amount set to $0, term set to 360 months, and rate set to 6% interest, output display shows $0.00', () => {
    component.find('#loanAmount').simulate("change", { target: { name: "loanAmount", value: "0" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "360" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "6" }})
    expect(component.find('#output').text()).toEqual("$0.00")
})

// TEST: When loan amount set to $1, term set to 1 month, and rate set to 0% interest, output display shows $1.00
test('When loan amount set to $1, term set to 1 month, and rate set to 0% interest, output display shows $1.00', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "1" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "1" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "0" }})
    expect(component.find('#output').text()).toEqual("$1.00")
})

// TEST: When loan amount set to $100, term set to 100 months, and rate set to 0% interest, output display shows $1.00
test('When loan amount set to $100, term set to 100 months, and rate set to 0% interest, output display shows $1.00', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "100" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "0" }})
    expect(component.find('#output').text()).toEqual("$1.00")
})

// TEST: When loan amount set to $100,000, term set to 360 months, and rate set to 6% interest, output display shows $599.55
test('When loan amount set to $100,000, term set to 360 months, and rate set to 6% interest, output display shows $599.55', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "100000" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "360" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "6" }})
    expect(component.find('#output').text()).toEqual("$599.55")
})

// TEST: When load amount set to $500,000, term set to 36 months, and rate set to 50%, output display shows $27,056.96
test('When load amount set to $500,000, term set to 36 months, and rate set to 50%, output display shows $27,056.96', () => {
    component.find('#loanAmount').simulate("change", { target: {  name: "loanAmount", value: "500000" }})
    component.find('#termInMonths').simulate("change", { target: { name: "termInMonths", value: "36" }})
    component.find('#interestRate').simulate("change", { target: { name: "interestRate", value: "50" }})
    expect(component.find('#output').text()).toEqual("$27,056.96")
})
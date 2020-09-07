const validateInterestRate = require('../src/validateInterestRate')

test('there is a function called validateInterestRate()', () => {
    expect(validateInterestRate).toBeDefined()
})

test('if passed the text "HELLLLO THERE", should return 0', () => {
    expect(validateInterestRate("HELLLLO THERE")).toBe(0)
})

test('if passed the text "2.50", should return 2.5', () => {
    expect(validateInterestRate("2.50")).toBe(2.5)
})

test('if passed the text "2.499", should return 2.499', () => {
    expect(validateInterestRate("2.499")).toBe(2.499)
})

test('if passed the text "0.0000000001", should return 0', () => {
    expect(validateInterestRate("0.0000000001")).toBe(0)
})

test('if passed the text "10.", should return 10', () => {
    expect(validateInterestRate("10.")).toBe(10)
})

test('if passed the text "1 year", should return 1', () => {
    expect(validateInterestRate("1 year")).toBe(1)
})

test('if passed the text "Hey guy I got 50 percent, high rate!", should return 50', () => {
    expect(validateInterestRate("Hey guy I got 50 percent, high rate!")).toBe(50)
})

test('if passed the text "8.8.8.8.8", should return 8.8', () => {
    expect(validateInterestRate("8.8.8.8.8")).toBe(8.8)
})

test('if passed the text "Some famous rates like two percent, 3.99 and all that stuff", should return 3.99', () => {
    expect(validateInterestRate("Some famous rates like two percent, 3.99 and all that stuff")).toBe(3.99)
})
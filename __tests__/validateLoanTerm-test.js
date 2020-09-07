const validateLoanTerm = require('../src/validateLoanTerm')

test('there is a function called validateLoanTerm()', () => {
    expect(validateLoanTerm).toBeDefined()
})

test('if passed the text "HELLLLO THERE", should return 1', () => {
    expect(validateLoanTerm("HELLLLO THERE")).toBe(1)
})

test('if passed the text "2.50", should return 3', () => {
    expect(validateLoanTerm("2.50")).toBe(3)
})

test('if passed the text "2.499", should return 2', () => {
    expect(validateLoanTerm("2.499")).toBe(2)
})

test('if passed the text "0.0000000001", should return 0', () => {
    expect(validateLoanTerm("0.0000000001")).toBe(0)
})

test('if passed the text "100000", should return 100000', () => {
    expect(validateLoanTerm("100000")).toBe(100000)
})

test('if passed the text "    100000", should return 100000', () => {
    expect(validateLoanTerm("    100000")).toBe(100000)
})

test('if passed the text "    100000    ", should return 100000', () => {
    expect(validateLoanTerm("    100000    ")).toBe(100000)
})

test('if passed the text ".100000", should return 0', () => {
    expect(validateLoanTerm(".100000")).toBe(0)
})

test('if passed the text "100000.", should return 100000', () => {
    expect(validateLoanTerm("100000.")).toBe(100000)
})

test('if passed the text "100000 years", should return 100000', () => {
    expect(validateLoanTerm("100000 years")).toBe(100000)
})

test('if passed the text "Hey guy I got 50 years to do stuff", should return 50', () => {
    expect(validateLoanTerm("Hey guy I got 50 years to do stuff")).toBe(50)
})

test('if passed the text "8.8.8.8.8", should return 9', () => {
    expect(validateLoanTerm("8.8.8.8.8")).toBe(9)
})

test('if passed the text "Some famous amounts of time like two months, 30 years, and all that stuff", should return 30', () => {
    expect(validateLoanTerm("Some famous amounts of time like two months, 30 years, and all that stuff")).toBe(30)
})
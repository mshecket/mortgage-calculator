const validateDollarAmount = require('../src/validateDollarAmount')

test('there is a function called validateDollarAmount()', () => {
    expect(validateDollarAmount).toBeDefined()
})

test('if passed the text "HELLLLO THERE", should return 0', () => {
    expect(validateDollarAmount("HELLLLO THERE")).toBe(0)
})

test('if passed the text "2.50", should return 2.5', () => {
    expect(validateDollarAmount("2.50")).toBe(2.5)
})

test('if passed the text "2.499", should return 2.5', () => {
    expect(validateDollarAmount("2.499")).toBe(2.5)
})

test('if passed the text "0.0000000001", should return 0', () => {
    expect(validateDollarAmount("0.0000000001")).toBe(0)
})

test('if passed the text "100000", should return 100000', () => {
    expect(validateDollarAmount("100000")).toBe(100000)
})

test('if passed the text "    100000", should return 100000', () => {
    expect(validateDollarAmount("    100000")).toBe(100000)
})

test('if passed the text "    100000    ", should return 100000', () => {
    expect(validateDollarAmount("    100000    ")).toBe(100000)
})

test('if passed the text ".100000", should return 0.1', () => {
    expect(validateDollarAmount(".100000")).toBe(0.1)
})

test('if passed the text "100000.", should return 100000', () => {
    expect(validateDollarAmount("100000.")).toBe(100000)
})

test('if passed the text "100000 dollars", should return 100000', () => {
    expect(validateDollarAmount("100000 dollars")).toBe(100000)
})

test('if passed the text "Hey guy I got 50 bucks", should return 50', () => {
    expect(validateDollarAmount("Hey guy I got 50 bucks")).toBe(50)
})

test('if passed the text "$500,000.00", should return 500000', () => {
    expect(validateDollarAmount("$500,000.00")).toBe(500000)
})

test('if passed the text "8.8.8.8.8", should return 8.8', () => {
    expect(validateDollarAmount("8.8.8.8.8")).toBe(8.8)
})

test('if passed the text "Some famous dollar amounts like a million BUCK$$$, 501, and all that stuff", should return 501', () => {
    expect(validateDollarAmount("Some famous dollar amounts like a million BUCK$$$, 501, and all that stuff")).toBe(501)
})
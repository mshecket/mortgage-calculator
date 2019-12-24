const monthlyPayment = require('../src/monthlyPayment')

test('there is a function called monthlyPayment()', () => {
    expect(monthlyPayment()).toBeDefined()
})

test('monthly payment on a loan of $0 over a term of 30 years (or 360 months) at 6% interest should be $0', () => {
    expect(monthlyPayment(0,360,0.06)).toBe(0)
})

test('monthly payment on a loan of $1 over a term of 1 month at 0% interest should be $1', () => {
    expect(monthlyPayment(1,1,0)).toBe(1)
})

test('monthly payment on a loan of $100 over a term of 100 months at 0% interest should be $1', () => {
    expect(monthlyPayment(100,100,0)).toBe(1)
})

test('monthly payment on a loan of $100,000 over a term of 30 years (or 360 months) at 6% interest should be $599.55', () => {
    expect(monthlyPayment(100000,360,0.06)).toBe(599.55)
})

test('monthly payment on a loan of $500,000 over a term of 3 years (or 36 months) at 50% interest should be $27,056.96', () => {
    expect(monthlyPayment(500000,36,0.5)).toBe(27056.96)
})
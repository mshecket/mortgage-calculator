/**
 * Takes a string or number input and returns a number in the format of an integer if possible;
 * otherwise returns 1.
 * 
 */

function validateLoanTerm(input) {
    if (/\d+\.{0,1}\d*|\d*\.{0,1}\d+/.test((input+"")))
        return Math.round((input+"").replace(/,/g,"").match(/\d+\.{0,1}\d*|\d*\.{0,1}\d+/)[0])
    else 
        return 1
}

module.exports = validateLoanTerm
/**
 * Takes a string or number input and returns a number in the format of a decimal to three places if possible;
 * otherwise returns 0.
 * 
 */

function validateInterestRate(input) {
    if (/\d+\.{0,1}\d*|\d*\.{0,1}\d+/.test(input+""))
        return Math.round((input+"").replace(/,/g,"").match(/\d+\.{0,1}\d*|\d*\.{0,1}\d+/)[0]*1000)/1000
    else 
        return 0
}

module.exports = validateInterestRate
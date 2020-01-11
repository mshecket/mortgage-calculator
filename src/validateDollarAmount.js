/**
 * Takes a string or number input and returns a number in the format x.xx if possible;
 * otherwise returns 0.00.
 * 
 */

function validateDollarAmount(input) {
    if (/\d+\.{0,1}\d*|\d*\.{0,1}\d+/.test((input+"")))
        return Math.round((input+"").replace(/,/g,"").match(/\d+\.{0,1}\d*|\d*\.{0,1}\d+/)[0]*100)/100
    else 
        return 0
}

module.exports = validateDollarAmount
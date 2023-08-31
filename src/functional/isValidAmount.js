const isValidAmount = (input) => {
    const isValidNumber = /^-?\d+(\.\d+)?$/.test(input);
    const parsedNumber = parseFloat(input);
    return isValidNumber && !isNaN(parsedNumber);
}

export default isValidAmount;

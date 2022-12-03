const path = require('path');
const {getFileLines} = require('../helpers');

const solution = () => {
    const lines = getFileLines(path.resolve(__dirname, 'input.txt'));
    let total = [];
    let sum = 0;
    lines.forEach((line) => {
        if (line.length) {
            sum += parseInt(line);
        } else {
            total.push(sum);
            sum = 0;
        }
    });
    const sorted = total.sort((a,b) => b - a);
    const topThree = sorted[2] + sorted[1] + sorted[0];
    console.log(`Day 01 - Part One: ${sum}, Part Two: ${topThree}`);
}

module.exports = {solution};
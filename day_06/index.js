const path = require('path');
const {getFileLines} = require('../helpers');

const partOne = (line) => {
    for (let i = 3; i < line.length; i++) {
        const newSet = new Set(line.slice(i - 3, i + 1));

        if (newSet.size === 4) {
            return i + 1;
        }
    }

    return -1;
}

const partTwo = (line) => {
    for (let i = 13; i < line.length; i++) {
        const newSet = new Set(line.slice(i - 13, i + 1));

        if (newSet.size === 14) {
            return i + 1;
        }
    }

    return -1;
}

const solution = () => {
    const lines = getFileLines(path.resolve(__dirname, 'input.txt'));

    console.log(`Day 06 - Part One: ${partOne(lines[0])}, Part Two: ${partTwo(lines[0])}`);
}

module.exports = {solution};
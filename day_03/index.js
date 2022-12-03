const path = require('path');
const {getFileLines} = require('../helpers');
const LOWER_CASE_ASCII_OFFSET = 96;
const UPPER_CASE_ASCII_OFFSET = 38;

const partOne = (line) => {
    const firstHalf = line.substring(0, line.length/2),
        secondHalf = line.substring(line.length/2, line.length);

    const duplicateItem = [...firstHalf].find((char) => secondHalf.indexOf(char) !== -1);

    return getPriority(duplicateItem);
}

const partTwo = (items) => {
    const badge = [...items[0]]
        .find((char) => 
            items[1].indexOf(char) !== -1
            && items[2].indexOf(char) !== -1
        );

    return getPriority(badge);
}

const getPriority = (char) => {
    const asciValue = char.charCodeAt(0);
    return char === char.toUpperCase() 
        ? asciValue - UPPER_CASE_ASCII_OFFSET
        : asciValue - LOWER_CASE_ASCII_OFFSET;
}

const solution = () => {
    const lines = getFileLines(path.resolve(__dirname, 'input.txt'));
    let partOneResult = 0, partTwoResult = 0;
    let partTwoElements = [];
    lines.forEach((line) => {
        partOneResult += partOne(line);
        partTwoElements.push(line);
        if (partTwoElements.length == 3) {
            partTwoResult += partTwo(partTwoElements);
            partTwoElements = [];
        }
    });
    console.log(`Day 03 - Part One: ${partOneResult}, Part Two: ${partTwoResult}`);
}

module.exports = {solution};
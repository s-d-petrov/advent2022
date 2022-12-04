const path = require('path');
const {getFileLines} = require('../helpers');

const partOne = (line) => {
    const sections = line.split(',');

    const firstElf = sections[0].split('-'),
        secondElf = sections[1].split('-');
    
    const startFirst = parseInt(firstElf[0]),
        endFirst = parseInt(firstElf[1]),
        startSecond = parseInt(secondElf[0]),
        endSecond = parseInt(secondElf[1]);

    if ((startFirst >= startSecond && endFirst <= endSecond) || (startFirst <= startSecond && endFirst >= endSecond)) {
        return 1;
    }

    return 0;
}

const partTwo = (line) => {
    const sections = line.split(',');

    const firstElf = sections[0].split('-'),
        secondElf = sections[1].split('-');
    
    const startFirst = parseInt(firstElf[0]),
        endFirst = parseInt(firstElf[1]),
        startSecond = parseInt(secondElf[0]),
        endSecond = parseInt(secondElf[1]);


    if ((startFirst >= startSecond && startFirst <= endSecond) || (startFirst <= startSecond && endFirst >= startSecond)) {
        return 1;
    }

    return 0;
}

const solution = () => {
    const lines = getFileLines(path.resolve(__dirname, 'input.txt'));
    let partOneResult = 0, partTwoResult = 0;
    lines.forEach((line) => {
        partOneResult += partOne(line);
        partTwoResult += partTwo(line);
    });
    console.log(`Day 04 - Part One: ${partOneResult}, Part Two: ${partTwoResult}`);
}

module.exports = {solution};
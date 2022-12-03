const path = require('path');
const {getFileLines} = require('../helpers');

const dict = {
    A: 1, // rock
    B: 2, // paper
    C: 3, // scissors
    X: 1, // rock
    Y: 2, // paper
    Z: 3  // scissors
}

const dictConditions = {
    X: { // I lose
        A: 'C',
        B: 'A',
        C: 'B',
    }, 
    Y: { // draw
        A: 'A',
        B: 'B',
        C: 'C',
    }, 
    Z: { // I win
        A: 'B',
        B: 'C',
        C: 'A',
    }, 
}

const calculatePartOne = (line) => {
    const parts = line.split(' ');

    return dict[parts[1]] + checkWinScore(parts[1], parts[0]);
}

const calculatePartTwo = (line) => {
    const parts = line.split(' ');
    const me = dictConditions[parts[1]][parts[0]];

    return dict[me] + checkWinScore(me, parts[0]);
}

const checkWinScore = (me, them) => {
    if (dict[me] === dict[them]) {
        return 3;
    }

    if (((me === 'X' || me === 'A') && them === 'C') ||  dict[me] === dict[them] + 1) {
        return 6;
    }

    return 0;
}

const solution = () => {
    const lines = getFileLines(path.resolve(__dirname, 'input.txt'));
    let partOneResult = 0, partTwoResult = 0;
    lines.forEach((line) => {
        partOneResult += calculatePartOne(line);
        partTwoResult +=calculatePartTwo(line);
    });
    console.log(`Day 02 - Part One: ${partOneResult}, Part Two: ${partTwoResult}`);
}

module.exports = {solution};
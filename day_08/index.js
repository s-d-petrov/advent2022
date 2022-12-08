const path = require('path');
const {getFileLines} = require('../helpers');

const getAnswers = (input) => {
    let count = 0;
    let bestScenicScore = -1;

    input.forEach((line, rowIndex) => {
        line.forEach((number, columnIndex) => {
            if (!isHidden(number, columnIndex, rowIndex, input)) {
                count++;
            }
            const scenicScore = getScenicScore(number, columnIndex, rowIndex, input);
            bestScenicScore = Math.max(bestScenicScore, scenicScore);
        })
    });
    return [count, bestScenicScore];
}

const convertInput = (lines) => {
    return lines.map((line) => {
        const split = line.split('');
        return split.map((num) => parseInt(num));
    })
}

const isHidden = (number, column, row, input) => {
    // edges
    if (column === 0 || row === 0 || row === input.length || column === input[row].length) {
        return false
    }

    // left
    if (input[row].slice(0, column).every((num) => num < number)) {
        return false;
    }

    // right
    if (input[row].slice(column + 1).every((num) => num < number)) {
        return false;
    }

    // top
    let arr = [];
    for (let i = 0; i < row; i++) {
        arr.push(input[i][column]);
    }

    if (arr.every((num) => num < number)) {
        return false;
    }

    // bottom
    arr = [];
    for (let i = row + 1; i < input.length; i++) {
        arr.push(input[i][column]);
    }

    if (arr.every((num) => num < number)) {
        return false;
    }

    return true;
}

const getScenicScore = (number, column, row, input) => {
    // edges
    if (column === 0 || row === 0 || row === input.length || column === input[row].length) {
        return 0
    }

    let ss = 1;
    // left
    const leftSubsection = input[row].slice(0, column);
    const treesLeft = leftSubsection.reverse().findIndex((num) => num >= number) + 1;
    ss *= getViewingDistance(treesLeft, leftSubsection);

    // right
    const rightSubsection = input[row].slice(column + 1);
    const treesRight = rightSubsection.findIndex((num) => num >= number) + 1;
    ss *= getViewingDistance(treesRight, rightSubsection);

    // top
    const tobSubsection = [];
    for (let i = 0; i < row; i++) {
        tobSubsection.push(input[i][column]);
    }

    const treesTop = tobSubsection.reverse().findIndex((num) => num >= number) + 1;
    ss *= getViewingDistance(treesTop, tobSubsection);

    // bottom
    const botSubsection = [];
    for (let i = row + 1; i < input.length; i++) {
        botSubsection.push(input[i][column]);
    }

    const treesBot = botSubsection.findIndex((num) => num >= number) + 1;
    ss *= getViewingDistance(treesBot, botSubsection);

    return ss;
}

const getViewingDistance = (treeCount, subsection) => {
    return treeCount === 0 ? subsection.length : treeCount;
}

const solution = () => {
    const lines = getFileLines(path.resolve(__dirname, 'input.txt'));
    const convertedInput = convertInput(lines);
    const [partOneResult, partTwoResult] = getAnswers(convertedInput);
    console.log(`Day 08 - Part One: ${partOneResult}, Part Two: ${partTwoResult}`);
}

module.exports = {solution};
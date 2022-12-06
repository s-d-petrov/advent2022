const path = require('path');
const {getFileLines} = require('../helpers');

const LINE_REGEX = /\[[(A-Z)]\]|(\s{4})/g;
const INSTRUCTIONS_REGEX = /move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/;

const partOne = (lines, initialPositions) => {
    let positions = JSON.parse(JSON.stringify(initialPositions));

    lines.forEach((line) => {
        const match = INSTRUCTIONS_REGEX.exec(line); 

        if (match) {
            const amount = parseInt(match.groups['amount']),
                from = parseInt(match.groups['from']) - 1,
                to = parseInt(match.groups['to']) - 1;

            for (let i = 0; i < amount; i++) {
                if (positions[from].length) {
                    const temp = positions[from].pop();
                    positions[to].push(temp);
                }
            }
        }
    });

    return Object.keys(positions)
        .map((key) => positions[key][positions[key].length - 1])
        .join('');
}

const partTwo = (lines, initialPositions) => {
    let positions = JSON.parse(JSON.stringify(initialPositions));

    lines.forEach((line) => {
        const match = INSTRUCTIONS_REGEX.exec(line); 

        if (match) {
            const amount = parseInt(match.groups['amount']),
                from = parseInt(match.groups['from']) - 1,
                to = parseInt(match.groups['to']) - 1;

            if (positions[from].length) {
                const temp = positions[from].splice(positions[from].length - amount, amount);
                positions[to].push(...temp);
            }
        }
    });

    return Object.keys(positions)
        .map((key) => positions[key][positions[key].length - 1])
        .join('');
}

const getInitialPositions = (lines) => {
    let positions = {};
    for (let i = 0; i < lines.length; i++){
        const match = lines[i].match(LINE_REGEX);

        if (!match) {
            Object.keys(positions).forEach((key) => {
                positions[key] = positions[key].reverse();
            })
            return positions;
        }

        match.forEach((record, index) => {
            if (record.indexOf('[') !== -1) {
                if (positions[index]) {
                    positions[index].push(record[1]);
                } else {
                    positions[index] = [record[1]];
                }
            }
        })
    }
}

const solution = () => {
    const lines = getFileLines(path.resolve(__dirname, 'input.txt'));
    const initialPositions = getInitialPositions(lines);

    const partOneResult = partOne(lines, initialPositions);
    const partTwoResult = partTwo(lines, initialPositions);
    console.log(`Day 05 - Part One: ${partOneResult}, Part Two: ${partTwoResult}`);
}

module.exports = {solution};
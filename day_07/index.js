const path = require('path');
const {getFileLines} = require('../helpers');

const HOME_DIR = '$ cd /',
    GO_BACK = '$ cd ..',
    LIST = '$ ls',
    FOLDER_REGEX = /^dir\s((?<folder>\w+)).*/,
    NAVIGATE_REGEX = /^\$\scd\s((?<folder>\w+))/,
    FILE_REGEX = /^((?<size>\d+))\s.*/;

const PART_ONE_LIMIT = 100000;
const PART_TWO_LIMIT = 70000000;
const PART_TWO_NEEDS = 30000000;

const getFileStructure = (lines) => {
    const structure = {0: {}};
    let currentFolder = 0;

    lines.forEach((line, index) => {
        switch (line){
            case HOME_DIR:
                currentFolder = 0;
                break;
            case LIST:
                // Do nothng
                break;
            case GO_BACK:
                currentFolder = structure[currentFolder].parent;
                break;
            default:
                const matchFolder = FOLDER_REGEX.exec(line);
                if (matchFolder) {
                    const newFolder = matchFolder.groups['folder'];
                    if (!structure[index]) {
                        structure[index] = {name: newFolder, parent: currentFolder, size: 0};
                    }
                    break;
                }

                const matchFile = FILE_REGEX.exec(line);
                if (matchFile) {
                    const fileSize = parseInt(matchFile.groups['size']);
                    const size = structure[currentFolder].size || 0;
                    structure[currentFolder].size = size + fileSize;

                    if (structure[currentFolder].parent >= 0) {
                        let parent = structure[currentFolder].parent;
                        let hasParent = true;
                        while(hasParent) {
                            structure[parent].size += fileSize;
                            if (parent === 0) {
                                hasParent = false;
                                continue;
                            }
                            parent = structure[parent].parent;
                        }
                    }
                    break;
                }

                const matchNavigate = NAVIGATE_REGEX.exec(line);
                if (matchNavigate) {
                    const tryNavigate = matchNavigate.groups['folder'];

                    for (let i = currentFolder + 1; i < index; i++) {
                        if (structure[i]?.name === tryNavigate && structure[i]?.parent === currentFolder) {
                            currentFolder = i;
                            break;
                        }
                    }
                    break;
                }
                break;
        }
    });
    return structure;
}

const getPartOneAnswer = (fileStructure) => {
    return Object.keys(fileStructure).reduce(function(sum, key) { 
        const currentSize = fileStructure[key]?.size <= PART_ONE_LIMIT 
            ? fileStructure[key].size
            : 0;
        return sum + currentSize;
    }, 0);
}

const partTwo = (fileStructure) => {
    const totalSize = fileStructure[0].size;
    const needToClear = totalSize - (PART_TWO_LIMIT - PART_TWO_NEEDS);
    let currentValue = Number.MAX_SAFE_INTEGER;

    Object.keys(fileStructure).forEach((key) => {
        if (fileStructure[key].size >= needToClear && fileStructure[key].size < currentValue) {
            currentValue = fileStructure[key].size;
        }
    });

    return currentValue;
}

const solution = () => {
    const lines = getFileLines(path.resolve(__dirname, 'input.txt'));

    const fileStructure = getFileStructure(lines);

    const partOneResult = getPartOneAnswer(fileStructure);
    const partTwoResult = partTwo(fileStructure);

    console.log(`Day 07 - Part One: ${partOneResult}, Part Two: ${partTwoResult}`);
}

module.exports = {solution};
const fs = require('fs');

const getFileLines = (path) => {
    return fs.readFileSync(path, 'utf-8').split(/\r?\n/);
}

module.exports = {getFileLines};
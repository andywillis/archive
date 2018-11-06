const fs = require('fs');
const path = require('path');

module.exports = {
  getData: function getData(callback) {
    const url = path.join(__dirname, 'stocklist.json');
    fs.readFile(url, 'utf8', (err, data) => {
      callback(data);
    });
  }
};

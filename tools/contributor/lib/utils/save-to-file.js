const fs = require('fs');

const saveToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }
    return true;
  });
};

module.exports = { saveToFile };

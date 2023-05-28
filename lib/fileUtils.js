// enables interaction with the file system
const fs = require('fs');

// writes content to filename
function writeFile(filename, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
// exports the writeFile function
module.exports = {
  writeFile,
};

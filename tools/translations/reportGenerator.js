const { writeFile, mkdir, stat } = require('fs');
const { dirname } = require('path');

const persistReport = (notUsedTranslations, fileName) => {
  const data = notUsedTranslations.map(tr => tr.key).join(',\r\n');
  return promiseMkDir(dirname(fileName))
    .then(() => promiseWriteFile(fileName, data))
    .catch(err => console.error(err));
};
const promiseMkDir = directory =>
  new Promise((resolve, reject) => {
    mkdir(directory, { recursive: true }, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

const promiseWriteFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    writeFile(fileName, data, err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

module.exports = { persistReport };

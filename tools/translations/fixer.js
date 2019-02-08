const { readFile, writeFile } = require('fs');
const { promiseReadFile } = require('./translationReader');

const fixTranslations = (notUsedTranslations, translationFileUri) =>
  promiseReadFile(translationFileUri).then(translations => {
    const notUsedTranslationList = notUsedTranslations.map(tr => tr.key);
    const usedKeys = Object.keys(translations).filter(transKey => !notUsedTranslationList.includes(transKey));
    const newTransObj = usedKeys.reduce((acc, cur) => {
      acc[cur] = translations[cur];
      return acc
    }, {});
    return promiseWriteFile(JSON.stringify(newTransObj, null, 2), translationFileUri);
  });

const promiseWriteFile = (data, fileName) =>
  new Promise((resolve, reject) => {
    writeFile(fileName, data, err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

module.exports = { fixTranslations };

const { readFile } = require('fs');

const getTranslationKeys = translationFileUrl =>
  promiseReadFile(translationFileUrl).then(translationsObj =>
    Object.keys(translationsObj).map(key => ({ key, found: false })),
  );

const promiseReadFile = translationFileUrl =>
  new Promise((resolve, reject) => {
    readFile(translationFileUrl, 'UTF-8', (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        const translationsObj = JSON.parse(data);
        return resolve(translationsObj);
      } catch (err) {
        return reject(err);
      }
    });
  });

module.exports = { getTranslationKeys, promiseReadFile };

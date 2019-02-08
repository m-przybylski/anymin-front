const { readFile } = require('fs');


const removeNotRelevantEndings = ['.none', '.single', '.few', '.many', '.other', 'DATE_PIPE'];

const getFileContent = path =>
  new Promise((resolve, reject) => {
    readFile(path, 'UTF-8', (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });

const translationExists = (fileContent, translation) => ({
  key: translation.key,
  found: translationKeyExistsInFile(translation.key, fileContent),
});

const translationKeyExistsInFile = (translationKey, fileContent) => {
  const reservedEndingFound = removeNotRelevantEndings.find(ending => translationKey.includes(ending))
  if (reservedEndingFound) {
    console.log(translationKey)
    return true;
  }
  return fileContent.includes(translationKey);
}

const checkFileAsync = translationsList => async file => {
  const fileContent = await getFileContent(file);

  return translationsList
    .map(translation => translationExists(fileContent, translation))
    .filter(translation => translation.found === false);
};

function* getFileChecker(translationsList) {
  let trans = translationsList;
  // tslint:disable-next-line:no-loop-statement
  while (true) {
    trans = yield checkFileAsync(trans);
  }
}

module.exports = { getFileChecker };

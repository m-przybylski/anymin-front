const SRC_ROOT = './src/app';
const SRC_PROJECTS = './projects';
const TRANSLATION_FILE = './lib/angular-translations/pl-pl.json';
const EXPORT_FILE = './tools/translations/report/extra-translations.txt';

const { filesFlat } = require('./directoryTree');
const { getFileChecker } = require('./checkFile');
const { persistReport } = require('./reportGenerator');
const { getTranslationKeys } = require('./translationReader');
const { fixTranslations } = require('./fixer');

const args = process.argv.slice(2);
const fix = args[0] === '--fix';

const getUnusedTranslations = async options => {
  const {
    srcRoot = SRC_ROOT,
    translationFile = TRANSLATION_FILE,
    fileName = EXPORT_FILE,
    srcProjects = SRC_PROJECTS
  } = { ...options };
  let translations = await getTranslationKeys(translationFile);
  const filesApp = await filesFlat(srcRoot);
  const filesProjects = await filesFlat(srcProjects);
  const files = filesApp.concat(filesProjects);
  const iter = getFileChecker(translations);
  let fileCheckIterator = iter.next();
  for (const file of files) {
    const checkFile = fileCheckIterator.value;
    translations = await checkFile(file);
    fileCheckIterator = iter.next(translations);
  }
  persistReport(translations, fileName);
  if (fix) {
    fixTranslations(translations, translationFile);
  }
};

getUnusedTranslations().then(() => console.log('Operation Completed!'));

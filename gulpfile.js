'use strict';

const gulp = require('gulp');
const chalk = require('chalk')
const translations = require('./lib/tr/tr')
const commonConfigGenerator = require('./lib/common-config/generator');

gulp.task('generate-common-config', function () {
  return commonConfigGenerator({
    ngModuleName: 'commonConfig',
    ngProviderName: 'CommonConfig',
    outputDir: './generated_modules/common-config',
    outputFileName: 'common-config.ts',
    fileGenerationSucceed: undefined,
    fileGenerationFailed: undefined,
    jsonSettingsEmpty: undefined
  })
});

gulp.task('download-translations', function (cb) {
  translations({
    outDir: './generated_modules/translations',
    collection: [
      {
        languageCode: 'pl-pl',
        url: 'https://tr.contactis.pl/api/Translations/export?projectId=4&projectLanguageId=3'
      },
      {
        languageCode: 'en-us',
        url: 'https://tr.contactis.pl/api/Translations/export?projectId=4&projectLanguageId=3'
      }
    ],
    ngModule: 'profitelo.translations',
    remoteTimeout: 30 * 1000, // on heavy loads tr responds after a long time
    success: cb,
    badRequest: function () {
      console.log(chalk.white.bgRed('[TRANSLATIONS] Bad request. Check if TR is up running'))
    },
    badRemoteFile: function (error) {
      console.log(chalk.white.bgRed('[TRANSLATIONS] Bad remote paths, check urls'))
      console.log(chalk.red('Last bad language url for lang: ' + error))
    },
    timeout: function () {
      console.log(chalk.white.bgRed('[TRANSLATIONS] Remote timeout'))
    },
    templateBuildFail: function (error) {
      console.log(chalk.white.bgRed('[TRANSLATIONS] Template build fail'))
      console.log(chalk.red(error))
    },
    successLangBuild: function (languageCode) {
      console.log(chalk.white.bgGreen('[TRANSLATIONS] Downloaded translation for: ' + chalk.yellow(languageCode)))
    }
  })
});

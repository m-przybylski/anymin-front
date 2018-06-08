const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

const modulePath = './lib/environment/';
const providerTemplate = modulePath + 'environment.hbs';
const pluginNamespace = '[COMMON-CONFIG-ENVIRONMENT-GENERATOR]';

// Helper to omit default `.toString()` method on Object
handlebars.registerHelper('json', (context) => JSON.stringify(context));

const fileGenerationSucceed = (path) => {
  console.log(chalk.white.bgGreen(pluginNamespace + ' Module successfully generated: ' + path));
};

const fileGenerationFailed = (error) => {
  console.log(chalk.white.bgRed(pluginNamespace + ' Template build fail'));
  console.log(chalk.red(error));
};

const generateCommonConfigFile = (payload, outputFilePath) => {
  fs.readFile(providerTemplate, {
    encoding: 'utf-8'
  }, (error, template) => {
    if (error) {
      fileGenerationFailed(error)
    } else {

      const code = handlebars.compile(template, {
        noEscape: true
      })(payload);

      fs.writeFile(outputFilePath, code, {
        encoding: 'utf-8'
      }, (error) => {
        if (error) {
          fileGenerationFailed(error)
        } else {
          fileGenerationSucceed(outputFilePath)
        }
      })
    }
  })
}

const generateCommonConfigs = (config) => {
  const envParam = process.argv
  const outputFileName = 'common-config.env.ts';
  const outputFilePath = config.outputDir + '/' + outputFileName;

  if (!fs.existsSync(outputFilePath)) {
    mkdirp.sync(path.dirname(outputFilePath))
  }

  generateCommonConfigFile({
    env_name: envParam[2] ? envParam[2].toUpperCase().replace('-', '') : ''
  }, outputFilePath)
}

generateCommonConfigs({
  outputFilesPrefix: 'common-config-env',
  outputDir: './generated_modules/common-config-env'
})

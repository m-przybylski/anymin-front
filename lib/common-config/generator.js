const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

const modulePath = './lib/common-config/';
const providerTemplate = modulePath + 'templates/strategy_config_provider.hbs';
const pluginNamespace = '[COMMON-CONFIG-GENERATOR]';

// Helper to omit default `.toString()` method on Object
handlebars.registerHelper('json', (context) => JSON.stringify(context));

const fileGenerationSucceed = (path) => {
  console.log(chalk.white.bgGreen(pluginNamespace + ' Module successfully generated: ' + path));
};

const fileGenerationFailed = (error) => {
    console.log(chalk.white.bgRed(pluginNamespace + ' Template build fail'));
    console.log(chalk.red(error));
};

const getJSONfromFile = (path) =>
  JSON.parse(fs.readFileSync(path, 'utf8'));

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

const generateCommonConfigs = (config) =>
  config.envs.forEach(env => {
    const envFileJSON = getJSONfromFile(modulePath + 'submodule/config.' + env + '.json');
    const outputFileName = config.outputFilesPrefix + '.' + env + '.ts';
    const outputFilePath = config.outputDir + '/' + outputFileName;

    if (!fs.existsSync(outputFilePath)) {
      mkdirp.sync(path.dirname(outputFilePath))
    }

    generateCommonConfigFile({
      ngInjectableName: config.className,
      jsonInterfaceName: env.toUpperCase().replace('-', ''),
      jsonSettings: envFileJSON
    }, outputFilePath)
  })

generateCommonConfigs({
  outputFilesPrefix: 'common-config',
  outputDir: './generated_modules/common-config',
  className: 'CommonConfig',
  envs: ['default', 'build-dev', 'build-stage', 'integration-test', 'build-demo', 'build-prod']
})

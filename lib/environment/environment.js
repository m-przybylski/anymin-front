const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

const pluginNamespace = '[ENVIRONMENT-GENERATOR]';

const fileGenerationSucceed = (path) => {
  console.log(chalk.white.bgGreen(pluginNamespace + ' Module successfully generated: ' + path));
};

const fileGenerationFailed = (error) => {
  console.log(chalk.white.bgRed(pluginNamespace + ' Create file failed'));
  console.log(chalk.red(error));
};

const generateEnvFile = (env, outputFilePath) => {
  fs.writeFile(outputFilePath, env, {
    encoding: 'utf-8'
  }, (error) => {
    if (error) {
      fileGenerationFailed(error)
    } else {
      fileGenerationSucceed(outputFilePath)
    }
  })
}

const generate = (config) => {
  const envArg = process.argv[2];
  const envName = envArg ? envArg.toLowerCase() : '';
  const outputFilePath = config.outputDir + 'environment.json';

  if (!fs.existsSync(outputFilePath)) {
    mkdirp.sync(path.dirname(outputFilePath))
  }

  generateEnvFile('{"environment": "' + envName +'"}', outputFilePath);
}

generate({
  outputFilesPrefix: 'environment',
  outputDir: './generated_modules/environment/'
})

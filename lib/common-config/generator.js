const chalk = require('chalk'),
  fs = require('fs'),
  handlebars = require('handlebars'),
  mkdirp = require('mkdirp'),
  path = require('path'),
  promises = require('promised-io/promise')

const Deferred = promises.Deferred,
  pluginNamespace = '[COMMON-CONFIG-GENERATOR]',
  modulePath = './lib/common-config/'

// Helper to omit default `.toString()` method on Object
handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context)
})

function commonConfigGenerator(moduleOptions) {
  //moduleOptions.jsonSettings = 'common-config/config.json'

  const ngModuleName = moduleOptions.ngModuleName || 'StrategyConfig',
    ngProviderName = moduleOptions.ngProviderName || 'strategyConfig',
    outputDir = moduleOptions.outputDir || 'strategy-config-module/',
    outputFileName = moduleOptions.outputFileName || 'strategy-config.js',
    providerTemplate = modulePath + 'templates/strategy_config_provider.hbs',
    fileGenerationSucceed = moduleOptions.fileGenerationSucceed || function () {
        console.log(chalk.white.bgGreen(pluginNamespace + ' Module successfully generated'))
      },
    fileGenerationFailed = moduleOptions.fileGenerationFailed || function (error) {
        console.log(chalk.white.bgRed(pluginNamespace + ' Template build fail'))
        console.log(chalk.red(error))
      },
    jsonSettingsEmpty = moduleOptions.jsonSettingsEmpty || function () {
        console.log(chalk.black.bgYellow(pluginNamespace + ' Empty strategy JSON object'))
      }

  const jsonSettings = getMergedJson()

  // Middle variable setters
  const outputFileNamePath = outputDir + '/' + outputFileName

  function createProviderFile() {
    const deferred = new Deferred()
    if (Object.keys(jsonSettings).length === 0) {
      jsonSettingsEmpty()
    }

    const context = {
      ngModuleName: ngModuleName,
      ngProviderName: ngProviderName,
      jsonSettings: jsonSettings
    }

    if (!fs.existsSync(outputFileNamePath)) {
      mkdirp.sync(path.dirname(outputFileNamePath))
    }

    fs.readFile(providerTemplate, {
      encoding: 'utf-8'
    }, function (error, template) {
      if (error) {
        deferred.reject(error)
      } else {
        const code = handlebars.compile(template, {
          noEscape: true
        })(context)
        fs.writeFile(outputFileNamePath, code, {
          encoding: 'utf-8'
        }, function (error) {
          if (error) {
            deferred.reject(error)
          } else {
            deferred.resolve()
          }
        })
      }
    })
    return deferred.promise
  }

  const deffered = new Deferred()
  createProviderFile().then(function (createdFileResponse) {
    fileGenerationSucceed()
    deffered.resolve(createdFileResponse)
  }, function (createdFileError) {
    fileGenerationFailed(createdFileError)
    deffered.resolve(createdFileError)
  })
  return deffered.promise
}


function getMergedJson() {
  function getJsonObject(val) {
    var inputJson
    if (Object.prototype.toString.call(val) === '[object String]') {
      inputJson = JSON.parse(fs.readFileSync(val, 'utf8'))
    } else if (Object.prototype.toString.call(val) === '[object Object]') {
      inputJson = val
    } else {
      inputJson = new Object()
    }
    return inputJson
  }

  function deepObjectExtend(target, source) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (target[prop] && typeof source[prop] === 'object') {
          deepObjectExtend(target[prop], source[prop]);
        }
        else {
          target[prop] = source[prop];
        }
      }
    }
    return target;
  }

  var env = process.env.PROFITELO_ENV || 'default'

  console.log('Loading ' + env + ' common-config..')

  var inputJson = getJsonObject(modulePath + 'submodule/config.default.json')

  var toMergeJson = getJsonObject(modulePath + 'submodule/config.' + env + '.json')

  var merged = deepObjectExtend(inputJson, toMergeJson)

  return merged
}

commonConfigGenerator({
  ngModuleName: 'commonConfig',
  ngProviderName: 'CommonConfig',
  outputDir: './generated_modules/common-config',
  outputFileName: 'common-config.ts',
  fileGenerationSucceed: undefined,
  fileGenerationFailed: undefined,
  jsonSettingsEmpty: undefined
})

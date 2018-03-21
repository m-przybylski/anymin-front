const fs = require("fs")
const request = require("request-promise")
const path = require("path")
const mkdirp = require("mkdirp")
const handlebars = require("handlebars")
const promises = require("promised-io/promise")
const chalk = require('chalk')
const Deferred = promises.Deferred

function translations(options) {
  const ngModule = options.ngModule || "tr.translations"
  const languagesCollection = options.collection
  const outDir = options.outDir + '/'
  const requestsQueue = []
  const fileCreationQueue = []

  function createLangFile(config) {

    const deferred = new Deferred()

    const context = {
      languageCode: config.languageCode,
      translations: config.translations.list,
      ngModule: ngModule + '.' + config.languageCode
    }

    const outputFile = outDir + context.languageCode + '.' + options.extension

    if (!fs.existsSync(outputFile)) {
      mkdirp.sync(path.dirname(outputFile))
    }

    fs.readFile(options.languageTemplate, {
      encoding: "utf-8"
    }, function (error, template) {
      if (error) {
        deferred.reject(error)
      } else {

        const code = handlebars.compile(template, {
          noEscape: true
        })(context)
        fs.writeFile(outputFile, code, {
          encoding: "utf-8"
        }, function (error) {
          if (error) {
            deferred.reject(error)
          } else {
            options.successLangBuild(context.languageCode)
            deferred.resolve()
          }
        })
      }
    })

    return deferred.promise
  }


  function createLanguageFilesFromArray(languagesCollection) {

    languagesCollection.forEach(function(language) {
      fileCreationQueue.push(createLangFile(language))
    })

    promises.all(fileCreationQueue).then(function() {
      options.success()
    })

  }

  function parseTranslationObject(translations) {

    let _isValid = true

    try {
     translations = JSON.parse(translations)
    } catch (error) {
      _isValid = false
    }

    if (_isValid) {
      const translationKeys = Object.keys(translations.list)
      translationKeys.forEach(function (key, i) {
        translations.list[key] = translations.list[key].replace(/(\r\n|\n|\r)/gm,"")
      })
    } else {
      translations = {}
    }

    return translations
  }


  // Task bootstrap
  let hadBeenTimedOut = false
  const timeout = setTimeout(function () {
    options.timeout()
    hadBeenTimedOut = true
  }, options.remoteTimeout || 20*1000)



  languagesCollection.forEach(function (translation) {
    requestsQueue.push(
      request({
        url: translation.url,
        simple: false,
        transform: function(body) {
          return {
            translations: parseTranslationObject(body),
            languageCode: translation.languageCode
          }
        }
      }).catch(function (e) {

      })
    )
  })

  const group = promises.all(requestsQueue)

  group.then(function (queueCollection) {

    let noErrorCount = 0
    let lastLanguageCode = ''
    let noResponse = 0
    queueCollection.forEach(function(response) {
      if (!response) {
        noResponse++
      }
      else if (!response.translations.error && Object.keys(response.translations).length > 0) {
        noErrorCount++
      } else {
        lastLanguageCode = response.languageCode
      }
    })
    if (!hadBeenTimedOut) {
      clearTimeout(timeout)
      if (queueCollection.length === noErrorCount) {
        createLanguageFilesFromArray(queueCollection)
      } else if (noResponse > 0) {
        options.badRequest()
      } else {
        options.badRemoteFile(lastLanguageCode)
      }
    }
  })
}

translations({
  extension: 'ts',
  languageTemplate: __dirname + "/templates/angularjs-translations.hbs",
  outDir: './generated_modules/angularjs-translations',
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
  success: function () {
    console.log(chalk.white.bgGreen('[TRANSLATIONS] Generated successfully'));
  },
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

translations({
  extension: 'json',
  languageTemplate: __dirname + "/templates/angular-translations.hbs",
  outDir: './generated_modules/angular-translations',
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
  success: function () {
    console.log(chalk.white.bgGreen('[TRANSLATIONS] Generated successfully'));
  },
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

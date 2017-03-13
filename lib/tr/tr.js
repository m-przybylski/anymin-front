var fs = require("fs")
var request = require("request-promise")
var path = require("path")
var url = require("url")
var _ = require("underscore")
var mkdirp = require("mkdirp")
var handlebars = require("handlebars")
_.str = require("underscore.string")
var promises = require("promised-io/promise")
var Deferred = promises.Deferred

module.exports = function (options) {


  var languageTemplate = __dirname + "/templates/translations.hbs"
  var ngModule = options.ngModule || "tr.translations"
  var languagesCollection = options.collection
  var outDir = options.outDir + '/'
  var requestsQueue = []
  var fileCreationQueue = []

  function createLangFile(config) {

    var deferred = new Deferred()

    var context = {
      languageCode: config.languageCode,
      translations: config.translations.list,
      ngModule: ngModule + '.' + config.languageCode
    }

    var outputFile = outDir + context.languageCode + '.ts'

    if (!fs.existsSync(outputFile)) {
      mkdirp.sync(path.dirname(outputFile))
    }

    fs.readFile(languageTemplate, {
      encoding: "utf-8"
    }, function (error, template) {
      if (error) {
        deferred.reject(error)
      } else {

        var code = handlebars.compile(template, {
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

    var _isValid = true

    try {
     translations = JSON.parse(translations)
    } catch (error) {
      _isValid = false
    }

    if (_isValid) {
      var translationKeys = Object.keys(translations.list)
      translationKeys.forEach(function (key, i) {
        translations.list[key] = translations.list[key].replace(/(\r\n|\n|\r)/gm,"")
      })
    } else {
      translations = {}
    }

    return translations
  }


  // Task bootstrap
  var hadBeenTimedOut = false
  var timeout = setTimeout(function () {
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

  var group = promises.all(requestsQueue)

  group.then(function (queueCollection) {

    var noErrorCount = 0
    var lastLanguageCode = ''
    var noResponse = 0
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

/* istanbul ignore next */
(function() {
  angular.module('profitelo.services.customTranslationHandler', [
    'pascalprecht.translate',
    'ngLodash'
  ])
  .factory('CustomTranslationHandlerService', function($translate, $log, lodash) {
    var _exceptionsStrings = [
      'Do not report this dummy translate string, for ex like icon below',
      '<i class="icon icon-home icon-sm"></i>'
    ]
    return function(translationId, uses) {
      if (translationId !== void 0 && !lodash.includes(_exceptionsStrings, translationId)) {
        var _str = 'Missing [' + uses + '] translations for: ' + translationId
        // TODO: move error reporting to sentry
        // $log.error(_str)
      }
    }
  })
}())
angular.module('profitelo.services.customTranslationHandler', [
  'pascalprecht.translate',
  'lodash'
])

.factory('CustomTranslationHandlerService', function($translate, $log, _) {
  var _exceptionsStrings = [
    'Do not report this dummy translate string, for ex like icon below',
    '<i class="icon icon-home icon-sm"></i>'
  ]
  return function(translationId, uses) {
    if (translationId !== void 0 && !_.include(_exceptionsStrings, translationId)) {
      var _str = 'Missing [' + uses + '] translations for: ' + translationId
      $log.error(_str)
    }
  }
})

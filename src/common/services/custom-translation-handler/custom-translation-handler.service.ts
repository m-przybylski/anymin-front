namespace profitelo.services.customTranslationHandlerService {

  export interface ICustomTranslationHandlerService {
    handler(translationId: string, uses: string): void
  }

  class CustomTranslationHandlerService implements ICustomTranslationHandlerService {

    private static _exceptionsStrings = [
      'Do not report this dummy translate string, for ex like icon below',
      '<i class="icon icon-home icon-sm"></i>'
    ]

    constructor(private lodash: _.LoDashStatic) {
    }

    public handler = (translationId, uses) => {
      if (translationId !== void 0 &&
        !this.lodash.includes(CustomTranslationHandlerService._exceptionsStrings, translationId)) {
        //var _str = 'Missing [' + uses + '] translations for: ' + translationId
        // TODO: move error reporting to sentry
        // this.$log.error(_str)
      }
    }

    public static getInstance (lodash: _.LoDashStatic) {
        return (new CustomTranslationHandlerService(lodash)).handler
    }
  }

  angular.module('profitelo.services.custom-translation-handler', [
    'pascalprecht.translate',
    'ngLodash'
  ])
  .service('CustomTranslationHandlerService', ['$log', 'lodash', CustomTranslationHandlerService.getInstance])
}

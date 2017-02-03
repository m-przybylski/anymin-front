namespace profitelo.services.interfaceLanguage {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  export interface IInterfaceLanguage {
    nativeName: string
    ietfCode: string
  }

  export interface IInterfaceLanguageService {
    getInterfaceLanguages(): Array<IInterfaceLanguage>
    getStartupLanguage(ietfCode?: string): string
    setLanguage(ietfCode: string): void
    unifyToIetfCode(inputCode: string): void
  }

  class InterfaceLanguageService implements IInterfaceLanguageService {

    private static selectedInterfaceLanguageCookie = 'selectedInterfaceLanguage'

    private static defaultTranslation = 'pl-pl'

    // Array with supported interface languages by this project
    // Add new one to support them
    private static interfaceLanguages: Array<IInterfaceLanguage> = [
      {nativeName: 'English (U.S.)', ietfCode: 'en-us'},
      {nativeName: 'Polski (Polska)', ietfCode: 'pl-pl'}
      // { nativeName: "Deutsch (Deutchland)", ietfCode: "de-de" }
    ]

    constructor(private $log: ng.ILogService, private $http: ng.IHttpService, private lodash: _.LoDashStatic,
                private $rootScope: IRootScopeService, private $translate: ng.translate.ITranslateService,
                private $locale: ng.ILocaleService, private $cookies: ng.cookies.ICookiesService,
                private $location: ng.ILocationService, private tmhDynamicLocale, private amMoment) {

    }

    // @method         _unifyToIetfCode
    // @param          {String}  inputCode    some string with language key; like `pl-PL`
    // @description    Unify languages code notation from different browser to one
    //                 like "xx-yy" or "xx" (ex: "en-us", "en"); For
    // @returns        { String }
    public unifyToIetfCode = (inputCode) => {
      if (angular.isUndefined(inputCode) || !inputCode) {
        // throw new Error('inputCode must be provided')
        inputCode = ''
      }
      return String(inputCode).trim().replace(/[_]/g, '-').toLowerCase()
    }

    // @method       _getInterfaceLanguages
    // @getter
    // @description  Get all frontend available interface languages from
    //               the database
    // @returns      {Array}
    public getInterfaceLanguages = () => {
      return InterfaceLanguageService.interfaceLanguages
    }

    // @method       _getStartupLanguage
    // @setter
    // @param        {String}    [ietfCode]   string with a language code; ex: en, en-us, pl-pl
    // @description  Determinate user startup language
    // @returns      { String }
    public getStartupLanguage = (ietfCode?: string) => {
      if (typeof ietfCode === 'undefined' || !ietfCode) {
        ietfCode = null
      }

      let _queryLang = this.$location.search().lang
      let _cookie = this.$cookies.get(InterfaceLanguageService.selectedInterfaceLanguageCookie)

      let _logDefaultTranslation = () => {
        let previousLanguage = this.unifyToIetfCode(this.$translate.use())
        let msg = 'Your language `' + previousLanguage + '`' +
          ' was not found, so used our default language `' + InterfaceLanguageService.defaultTranslation + '`, ' +
          this.lodash.find(InterfaceLanguageService.interfaceLanguages,
            {ietfCode: InterfaceLanguageService.defaultTranslation})['nativeName'] + '.'

        this.$log.info(msg)

        return InterfaceLanguageService.defaultTranslation
      }

      if (ietfCode !== null && ietfCode) {
        // pre-defined language
        return ietfCode
      } else if (_queryLang && this.lodash.find(InterfaceLanguageService.interfaceLanguages, {ietfCode: _queryLang})) {
        // variable lang from URL
        return _queryLang
      } else if (angular.isDefined(_cookie)) {
        if (this.lodash.find(InterfaceLanguageService.interfaceLanguages, {ietfCode: _cookie})) {
          // found right language into cookie
          return _cookie
        } else {
          // language into cookie was not found into `_interfaceLanguages` so we set default
          return _logDefaultTranslation()
        }
      } else {
        if (this.lodash.find(InterfaceLanguageService.interfaceLanguages,
            {ietfCode: this.unifyToIetfCode(this.$translate.use())})) {
          // found language
          return this.unifyToIetfCode(this.$translate.use())
        } else {
          // not found a language
          return _logDefaultTranslation()
        }
      }
    }

    // @method       _setLanguage
    // @setter
    // @param        {String}   langCode    some string with language key; like `pl-PL`
    // @description  Set user language for the website.
    public setLanguage = (ietfCode) => {
      let _code = this.unifyToIetfCode(ietfCode)
      let _countryCode = _code.split('-')[0]
      this.$cookies.put(InterfaceLanguageService.selectedInterfaceLanguageCookie, _code)
      this.$http.defaults.headers.common['X-LANG'] = _code
      this.$rootScope.$locale = this.$locale
      this.$translate.use(_code)        // for translations strings
      this.tmhDynamicLocale.set(_code)  // set locale for translations
      this.amMoment.changeLocale(_countryCode)
    }
  }

  angular.module('profitelo.services.interface-language', [
    'pascalprecht.translate',
    'angularMoment',
    'tmh.dynamicLocale',
    'ngCookies',
    'ngLodash'
  ])
  .service('InterfaceLanguageService', InterfaceLanguageService)
}

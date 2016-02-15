// LanguageService
// ===============
angular.module('profitelo.services.interfaceLanguage', [
  'pascalprecht.translate',
  'angularMoment',
  'tmh.dynamicLocale',
  'ngCookies',
  'lodash'
])


.service('InterfaceLanguageService', function($q, $log, $http, $rootScope,
$translate, $locale, $cookies, $location, tmhDynamicLocale, amMoment, _) {

  // name for language cookie file
  let _selectedInterfaceLanguageCookie = 'selectedInterfaceLanguage'


  // This ietfCode should be choosen from _interfaceLanguages array
  let _defaultTranslation = 'pl-pl'


  // Array with supported interface languages by this project
  // Add new one to support them
  let _interfaceLanguages = [
    { nativeName: 'English (U.S.)', ietfCode: 'en-us' },
    { nativeName: 'Polski (Polska)', ietfCode: 'pl-pl' }
    // { nativeName: "Deutsch (Deutchland)", ietfCode: "de-de" }
  ]


  // @method         _unifyToIetfCode
  // @param          {String}  inputCode    some string with language key; like `pl-PL`
  // @description    Unify languages code notation from different browser to one
  //                 like "xx-yy" or "xx" (ex: "en-us", "en"); For
  // @returns        { String }
  var _unifyToIetfCode = function(inputCode) {
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
  var _getInterfaceLanguages = function() {
    return _interfaceLanguages
  }


  // @method       _getStartupLanguage
  // @setter
  // @param        {String}    [ietfCode]   string with a language code; ex: en, en-us, pl-pl
  // @description  Determinate user startup language
  // @returns      { String }
  var _getStartupLanguage = function(ietfCode) {
    if (typeof ietfCode === 'undefined' || !ietfCode) {
      ietfCode = null
    }

    let _queryLang  = $location.search().lang
    // console.log("_queryLang", _queryLang)
    let _cookie     = $cookies.get(_selectedInterfaceLanguageCookie)
    console.log("_cookie", _cookie)


    let _logDefaultTranslation = function() {
      let previousLanguage = null
      if (_.findWhere(_interfaceLanguages, {ietfCode: _cookie}, 'ietfCode')) {
        previousLanguage = _cookie
      } else {
        previousLanguage = _unifyToIetfCode($translate.use())
      }

      let msg = 'Your language `' + previousLanguage + '`' +
        ' was not found, so used our default language `' + _defaultTranslation + '`, ' +
        _.findWhere(_interfaceLanguages, {ietfCode: _defaultTranslation})['nativeName'] + '.'
      $log.info(msg)
      return _defaultTranslation
    }

    console.log('before return')
    if (ietfCode !== null && ietfCode) {
      // pre-defined language
      console.log('pre-defined language', ietfCode)
      return ietfCode
    } else if (_queryLang && _.findWhere(_interfaceLanguages, {ietfCode: _queryLang}, 'ietfCode')) {
      // variable lang from URL
      console.log('_queryLang', _queryLang)
      return _queryLang
    } else if (angular.isDefined(_cookie)) {
      if (_.findWhere(_interfaceLanguages, {ietfCode: _cookie}, 'ietfCode')) {
        // found right language into cookie
        console.log('found right language into cookie', _cookie)
        return _cookie
      } else {
        // language into cookie was not found into `_interfaceLanguages` so we set default
        console.log('language into cookie was not found into `_interfaceLanguages` so we set default', _logDefaultTranslation())
        return _logDefaultTranslation()
      }
    } else {
      console.log("$translate.use()", $translate.use())
      if (_.findWhere(_interfaceLanguages, {ietfCode: _unifyToIetfCode($translate.use())}, 'ietfCode')) {
        // found language
        console.log('found language', _unifyToIetfCode($translate.use()))
        return _unifyToIetfCode($translate.use())
      } else {
        // not found a language
        console.log('not found a language', _logDefaultTranslation())
        return _logDefaultTranslation()
      }
    }
  }


  // @method       _setLanguage
  // @setter
  // @param        {String}   langCode    some string with language key; like `pl-PL`
  // @description  Set user language for the website.
  var _setLanguage = function(ietfCode) {
    console.log('a moze tutaj?')
    let _code = _unifyToIetfCode(ietfCode)
    let _countryCode = _code.split('-')[0]
    $cookies.put(_selectedInterfaceLanguageCookie, _code)
    $http.defaults.headers.common['X-LANG'] = _code
    $rootScope.$locale = $locale
    $translate.use(_code)        // for translations strings
    tmhDynamicLocale.set(_code)  // set locale for translations
    amMoment.changeLocale(_countryCode)
  }


  return {
    getInterfaceLanguages:  _getInterfaceLanguages,
    getStartupLanguage:     _getStartupLanguage,
    setLanguage:            _setLanguage,
    unifyToIetfCode:        _unifyToIetfCode
  }
})

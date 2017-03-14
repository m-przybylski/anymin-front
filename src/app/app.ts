//import "moment/min/moment-with-locales"
import "jquery"
import "jquery-bridget"
import "bootstrap-sass/assets/javascripts/bootstrap"
import "perfect-scrollbar/dist/js/perfect-scrollbar.jquery"
import * as angular from "angular"
import "angular-translate"
import "angular-dynamic-locale"
import "angular-animate"
import "ng-lodash"
import "angular-ui-router"
import 'angular-ui-bootstrap'
import 'angular-ui-mask'
import 'angular-permission'

import 'angular-moment'
import 'angular-cookies'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import customTranslationHandlerModule from "../common/services/custom-translation-handler/custom-translation-handler"
import interfaceLanguageModule from "../common/services/interface-language/interface-language"
import sessionModule from "../common/services/session/session"
import permissionModule from "../common/services/permission/permission"
import pagesModule from "./pages"
import communicatorModule from "../common/components/communicator/communicator"
import "common/components/interface/preloader-container/preloader-container"
import "../../generated_modules/translations/pl-pl"
import "../../generated_modules/translations/en-us"
import topAlertModule from "../common/services/top-alert/top-alert"
import {AppComponentController} from "./app.controller"
import {AppConfigFunction} from "./app.config"
import {AppRunFunction} from "./app.run"
import "croppie"
//import 'messageformat/messageformat.js'
//import 'messageformat/locale/pl.js'
// import 'messageformat/locale/en.js'
//import 'angular-translate-interpolation-messageformat'

import "masonry-layout/dist/masonry.pkgd"
import "angular-masonry"
import "ng-masonry"

import 'reset.css/reset.css'
import  'angular-toastr/dist/angular-toastr.css'
import  'angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
import  'ui-select/dist/select.css'
import  'perfect-scrollbar/dist/css/perfect-scrollbar.css'
import  'angularjs-slider/dist/rzslider.css'
import  'croppie/croppie.css'
import "./../template/profitelo_theme/stylesheets/main.sass"
import navbarModule from "../common/components/navbar/navbar"
import {CommonConfig, default as commonConfigModule} from "../../generated_modules/common-config/common-config"

declare const Raven: any

// TODO: replace it with custom logging
try { // fix unit tests window problem
  if (window.location.host.includes('stage')) {
    Raven
      .config('https://8ba058291ca44938bc6c2c9de13434d6@sentry.io/136454')
      .addPlugin(Raven.Plugins.Angular, angular)
      .install()
    console.log("Sentry logs enabled")
  } else {
    console.log("Sentry logs disabled")
  }
} catch (e) {
}


angular.module('profitelo', [
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ngAnimate',
  'ngLodash',
  'ui.router',
  'permission',
  'permission.ui',

  // modules
  commonConfigModule,

  // services
  topAlertModule,
  interfaceLanguageModule,
  customTranslationHandlerModule,
  sessionModule,
  permissionModule,

  // controllers
  pagesModule,
  communicatorModule,
  'profitelo.components.interface.preloader-container',
  navbarModule,

  // translations
  'profitelo.translations.en-us',
  'profitelo.translations.pl-pl'

])
  .run(AppRunFunction)
  .config(AppConfigFunction)
  .controller('AppComponentController', AppComponentController)
  .factory('apiUrl', (CommonConfig: CommonConfig) => {
    return CommonConfig.getAllData().urls.backend
  })

import 'jquery';
import 'jquery-bridget';
import 'bootstrap-sass/assets/javascripts/bootstrap';
import 'perfect-scrollbar/dist/js/perfect-scrollbar.jquery';
import * as angular from 'angular';
import 'angular-translate';
import 'angular-dynamic-locale';
import 'angular-animate';
import uiRouter from '@uirouter/angularjs';
import 'angular-ui-bootstrap';
import 'angular-ui-mask';
import 'angular-permission';
import 'angular-moment';
import 'angular-cookies';
import customTranslationHandlerModule from '../common/services/custom-translation-handler/custom-translation-handler';
import interfaceLanguageModule from '../common/services/interface-language/interface-language';
import sessionModule from '../common/services/session/session';
import permissionModule from '../common/services/permission/permission';
import pagesModule from './pages';
import communicatorModule from '../common/components/communicator/communicator';
import 'angularjs/common/components/interface/preloader-container/preloader-container';
import '../../../generated_modules/translations/pl-pl';
import '../../../generated_modules/translations/en-us';
import topAlertModule from '../common/services/top-alert/top-alert';
import { AppComponentController } from './app.controller';
import { AppConfigFunction } from './app.config';
import { AppRunFunction } from './app.run';
import 'croppie';
import { CommonConfig, default as commonConfigModule } from '../../../generated_modules/common-config/common-config';
import profiteloWebsocketModule from '../common/services/profitelo-websocket/profitelo-websocket';
import pagePreloaderModule from '../common/components/interface/page-preloader/page-preloader';
import activeCallBarModule from '../common/components/communicator/active-call-bar/active-call-bar';
import toggleClassOnPullCall from '../common/directives/toggle-class-on-pull-call/toggle-class-on-pull-call';
import cookieNotificationModule from '../common/components/cookie-notification/cookie-notification';
import sessionDeletedModule from '../common/services/session-deleted/session-deleted';
import { UpgradeService } from '../common/services/upgrade/upgrade.service';
import loggerModule from '../common/services/logger/logger';

declare const Raven: any;

// TODO: replace it with custom logging
// tslint:disable:no-console
try {
  if (window.location.host.includes('stage')) {
    Raven
      .config('https://8ba058291ca44938bc6c2c9de13434d6@sentry.io/136454')
      .addPlugin(Raven.Plugins.Angular, angular)
      .install();
    console.log('Sentry logs enabled');
  } else {
    console.log('Sentry logs disabled');
  }
} catch (e) {
}

export const angularjsModule = angular.module('profitelo', [
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ngAnimate',

  uiRouter,
  'permission',
  'permission.ui',

  // modules
  commonConfigModule,

  // services
  loggerModule,
  topAlertModule,
  interfaceLanguageModule,
  customTranslationHandlerModule,
  sessionModule,
  profiteloWebsocketModule,
  permissionModule,
  sessionDeletedModule,

  // controllers
  pagesModule,
  communicatorModule,

  // components
  pagePreloaderModule,
  activeCallBarModule,
  cookieNotificationModule,

  // directives
  'profitelo.components.interface.preloader-container',
  'profitelo.directives.pro-top-waiting-loader',
  toggleClassOnPullCall,

  // translations
  'profitelo.translations.en-us',
  'profitelo.translations.pl-pl'

])
  .run(['$rootScope', '$log', 'permissionService', '$anchorScroll',
    'sessionServiceWrapper', '$urlRouter', '$state', 'topAlertService', 'sessionDeletedService',
    'profiteloWebsocket', AppRunFunction])
  .config(['$urlRouterProvider', '$httpProvider', '$stateProvider', '$translateProvider',
    '$locationProvider', '$animateProvider', 'tmhDynamicLocaleProvider', AppConfigFunction])
  .controller('AppComponentController', ['InterfaceLanguageService', AppComponentController])
  .factory('apiUrl',
    ['CommonConfig', (CommonConfig: CommonConfig): string => CommonConfig.getAllData().urls.backend])
  .service('upgradeService', UpgradeService);

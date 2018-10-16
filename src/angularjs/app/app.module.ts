// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
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
import 'angularjs/common/components/interface/preloader-container/preloader-container';
import 'angularjs/common/directives/interface/pro-alert/pro-alert';
import 'angularjs/common/directives/pro-top-waiting-loader/pro-top-waiting-loader';
import 'angularjs/common/services/top-waiting-loader/top-waiting-loader';
import '../../../lib/angularjs-translations/pl-pl';
import '../../../lib/angularjs-translations/en-us';
import topAlertModule from '../common/services/top-alert/top-alert';
import { AppComponentController } from './app.controller';
import { AppConfigFunction } from './app.config';
import { AppRunFunction } from './app.run';
import 'croppie';
import pagePreloaderModule from '../common/components/interface/page-preloader/page-preloader';
import cookieNotificationModule from '../common/components/cookie-notification/cookie-notification';
import sessionDeletedModule from '../common/services/session-deleted/session-deleted';
import { UpgradeService } from '../common/services/upgrade/upgrade.service';
import loggerModule from '../common/services/logger/logger';
import { Config } from '../../config';
import * as Raven from 'raven-js';
import { EnvironmentService } from '../../app/core/services/environment/environment.service';
import anymindWebsocketModule from '../common/services/anymind-websocket/anymind-websocket.service';
const ngRaven = require('raven-js/plugins/angular');

Raven.config(Config.sentry.url, Config.sentry.options)
  .addPlugin(ngRaven, angular)
  .setShouldSendCallback(() => Config.sentry.enabledEnvironments.includes(EnvironmentService.get()))
  .install();

export const angularjsModule = angular
  .module('profitelo', [
    ngRaven.moduleName,
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngAnimate',

    uiRouter,
    'permission',
    'permission.ui',

    // services
    loggerModule,
    topAlertModule,
    interfaceLanguageModule,
    customTranslationHandlerModule,
    sessionModule,
    permissionModule,
    anymindWebsocketModule,
    sessionDeletedModule,

    // controllers
    pagesModule,

    // components
    pagePreloaderModule,
    cookieNotificationModule,

    // directives
    'profitelo.components.interface.preloader-container',
    'profitelo.directives.pro-top-waiting-loader',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.directives.interface.pro-alert',

    // translations
    'profitelo.translations.en-us',
    'profitelo.translations.pl-pl',
  ])
  .run([
    '$rootScope',
    '$log',
    'permissionService',
    '$anchorScroll',
    'sessionServiceWrapper',
    '$urlRouter',
    '$state',
    'topAlertService',
    AppRunFunction,
  ])
  .config([
    '$urlRouterProvider',
    '$stateProvider',
    '$translateProvider',
    '$locationProvider',
    '$animateProvider',
    'tmhDynamicLocaleProvider',
    AppConfigFunction,
  ])
  .controller('AppComponentController', ['InterfaceLanguageService', AppComponentController])
  .constant('apiUrl', window.location.origin)
  .service('upgradeService', UpgradeService);

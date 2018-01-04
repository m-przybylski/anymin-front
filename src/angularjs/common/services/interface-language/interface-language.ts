import * as angular from 'angular'
import {InterfaceLanguageService} from './interface-language.service'

const interfaceLanguageModule = angular.module('profitelo.services.interface-language', [
  'pascalprecht.translate',
  'angularMoment',
  'tmh.dynamicLocale',
  'ngCookies',

])
  .service('InterfaceLanguageService', InterfaceLanguageService)
  .name

export default interfaceLanguageModule;

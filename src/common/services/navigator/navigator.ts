import * as angular from 'angular'
import {NavigatorService} from './navigator.service'

const navigatorModule = angular.module('profitelo.services.navigator', [])
  .service('navigatorService', NavigatorService)
  .name

export default navigatorModule;

import * as angular from 'angular'
import {RatelSdk} from './ratel-sdk.factory'

const ratelSdkModule = angular.module('profitelo.ratel-sdk', [])
  .service('ratelSdk', RatelSdk)
  .name

export default ratelSdkModule;

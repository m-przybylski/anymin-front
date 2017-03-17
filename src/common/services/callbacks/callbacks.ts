import * as angular from 'angular'
import {CallbacksFactory} from './callbacks.factory'

const callbacksModule = angular.module('profitelo.services.callbacks', [])
  .service('callbacksFactory', CallbacksFactory)
  .name

export default callbacksModule;

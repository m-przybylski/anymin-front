import * as angular from 'angular'
import {PromiseService} from './promise.service'

const promiseModule = angular.module('profitelo.services.promise', [])
.service('promiseService', PromiseService)
  .name

export default promiseModule

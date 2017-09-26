import * as angular from 'angular'
import {LanguagesService} from './languages.service'

const languagesModule = angular.module('profitelo.services.languages', [
])
  .service('languages', LanguagesService)
  .name

export default languagesModule

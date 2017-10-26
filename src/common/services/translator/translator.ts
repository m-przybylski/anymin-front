import * as angular from 'angular'
import {TranslatorService} from './translator.service'

const translatorModule = angular.module('profitelo.services.translator', [
  'pascalprecht.translate'
])
.service('translatorService', TranslatorService)
  .name

export default translatorModule;

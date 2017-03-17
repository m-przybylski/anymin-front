import * as angular from 'angular'
import {CustomTranslationHandlerService} from './custom-translation-handler.service'

const customTranslationHandlerModule = angular.module('profitelo.services.custom-translation-handler', [
  'pascalprecht.translate',
  'ngLodash'
])
  .service('CustomTranslationHandlerService', ['lodash', CustomTranslationHandlerService.getInstance])
  .name

export default customTranslationHandlerModule;

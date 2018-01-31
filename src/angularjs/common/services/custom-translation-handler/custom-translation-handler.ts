import * as angular from 'angular';
import { CustomTranslationHandlerService } from './custom-translation-handler.service';

const customTranslationHandlerModule = angular.module('profitelo.services.custom-translation-handler', [
  'pascalprecht.translate',

])
  .service('CustomTranslationHandlerService', CustomTranslationHandlerService.getInstance)
  .name;

export default customTranslationHandlerModule;

import * as angular from 'angular';
import { LanguagesService } from './languages.service';

const languagesModule = angular.module('profitelo.services.languages', [
])
  .service('languagesService', LanguagesService)
  .name;

export default languagesModule;

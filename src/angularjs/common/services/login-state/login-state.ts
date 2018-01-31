import * as angular from 'angular';
import { LoginStateService } from './login-state.service';

const loginStateModule = angular.module('profitelo.services.login-state', [])
  .service('loginStateService', LoginStateService)
  .name;

export default loginStateModule;

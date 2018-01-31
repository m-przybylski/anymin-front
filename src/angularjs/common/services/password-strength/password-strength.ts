import * as angular from 'angular';
import { PasswordStrengthService } from './password-strength.service';

const passwordStrengthModule = angular.module('profitelo.services.password-strength', [])
  .service('passwordStrengthService', PasswordStrengthService)
  .name;

export default passwordStrengthModule;

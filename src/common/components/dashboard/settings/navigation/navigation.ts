import {UserService} from '../../../../services/user/user.service'
import * as angular from 'angular'
import userModule from '../../../../services/user/user'
import {Config} from '../../../../../app/config';

/* @ngInject */
function controller(userService: UserService): void {

  this.isPlatformForExpert = Config.isPlatformForExpert

  userService.getUser().then((accountDetails) => {
    this.isWizardComplete = accountDetails.isCompany || accountDetails.isExpert
  })
  return this
}

const component = {
  template: require('./navigation.pug')(),
  controller,
  controllerAs: '$ctrl',
  bindings: {
    stateNames: '<'
  }
}

const settingsNavigation = angular.module('profitelo.components.settings.navigation', [
  'pascalprecht.translate',
  'ui.router',
  userModule
])
  .component('settingsNavigation', component)
  .name

export default settingsNavigation

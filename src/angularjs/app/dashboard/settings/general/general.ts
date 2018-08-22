// tslint:disable:readonly-array
// tslint:disable:no-require-imports
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import urlModule from '../../../../common/services/url/url';
import userModule from '../../../../common/services/user/user';
import modalsModule from '../../../../common/services/modals/modals';
import { UserService } from '../../../../common/services/user/user.service';
import { ModalsService } from '../../../../common/services/modals/modals.service';
import { Config } from '../../../../../config';
import { StateService, StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import { Account } from '@anymind-ng/api';

// tslint:disable:member-ordering
export class DashboardSettingsGeneralController implements ng.IController {
  public avatarImageSource?: string;
  public nickname?: string;
  public phoneNumber: string;
  public email?: string;
  public country: string;
  public unverifiedEmail?: string;
  public showUnverifiedEmail: boolean;
  public isPlatformForExpert = Config.isPlatformForExpert;

  public static $inject = ['modalsService', 'user', '$state'];

  constructor(private modalsService: ModalsService, user: Account, private $state: StateService) {
    this.nickname = user.details.nickname;
    this.avatarImageSource = user.details.avatar;
    this.phoneNumber = user.msisdn;
    this.email = user.email;
    this.country = user.countryISO;
    this.unverifiedEmail = user.unverifiedEmail;
    this.showUnverifiedEmail = typeof this.unverifiedEmail !== 'undefined' && this.unverifiedEmail !== '';
  }

  public openBasicAccountSettingsModal = (): void => {
    this.modalsService.createBasicAccountSettingsModal(this.onModalClose);
  };

  public openGeneralPhoneSettingsModal = (): void => {
    this.modalsService.createGeneralPhoneSettingsModal(this.onModalClose);
  };

  public openGeneralEmailSettingsModal = (): void => {
    this.modalsService.createGeneralEmailSettingsModal(this.onModalClose);
  };

  public openGeneralCountrySettingsModal = (): void => {
    // TODO Uncomment If we allow user change Country
    // this.modalsService.createGeneralCountrySettingsModal(this.onModalClose)
  };

  private onModalClose = (cb: () => void): void => {
    this.$state
      .reload()
      .then(cb)
      .catch(cb);
  };
}

angular
  .module('profitelo.controller.dashboard.settings.general', [
    'pascalprecht.translate',
    userModule,
    uiRouter,
    urlModule,
    modalsModule,
  ])
  .config([
    '$stateProvider',
    ($stateProvider: StateProvider): void => {
      $stateProvider.state('app.dashboard.settings.general', {
        url: '/general',
        template: require('./general.html'),
        controller: 'dashboardSettingsGeneralController',
        controllerAs: 'vm',
        resolve: {
          user: ['userService', (userService: UserService): ng.IPromise<Account> => userService.getUser(true)],
        },
        data: {},
      });
    },
  ])
  .controller('dashboardSettingsGeneralController', DashboardSettingsGeneralController);

// tslint:disable:no-import-side-effect
// tslint:disable:no-duplicate-imports
import * as angular from 'angular';
import 'angular-touch';
import 'angular-permission';
import modalsModule from '../../common/services/modals/modals';
import { InvitationsResolver } from './invitations.resolver';
import { StateProvider, StateParams } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import topAlertModule from '../../common/services/top-alert/top-alert';

export interface IInvitationsStateParams extends StateParams {
  companyId: string;
}

const invitationsPageModule = angular
  .module('profitelo.controller.invitations', [
    'permission',
    uiRouter,
    'permission.ui',
    'ngTouch',
    topAlertModule,
    modalsModule,
  ])
  .config([
    '$stateProvider',
    ($stateProvider: StateProvider): void => {
      $stateProvider.state('app.invitations', {
        url: '/insd/{token}',
        resolve: {
          invitations: [
            'invitationsResolver',
            '$stateParams',
            (invitationsResolver: InvitationsResolver, $stateParams: IInvitationsStateParams): void =>
              invitationsResolver.resolve($stateParams),
          ],
        },
        data: {
          pageTitle: 'PAGE_TITLE.INVITATIONS',
        },
      });
    },
  ])
  .service('invitationsResolver', InvitationsResolver).name;

export default invitationsPageModule;

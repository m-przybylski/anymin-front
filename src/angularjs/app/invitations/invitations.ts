import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import modalsModule from '../../common/services/modals/modals'
import {InvitationsResolver} from './invitations.resolver'
import {StateProvider, StateParams} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

export interface IInvitationsStateParams extends StateParams {
  companyId: string
}

const invitationsPageModule = angular.module('profitelo.controller.invitations', [
  'permission',
  uiRouter,
  'permission.ui',
  'ngTouch',
  modalsModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.invitations', {
      url: '/invitations/{token}',
      resolve: {
        invitations: ['invitationsResolver', '$stateParams',
          (invitationsResolver: InvitationsResolver, $stateParams: IInvitationsStateParams): void =>
            invitationsResolver.resolve($stateParams)]
      },
      data: {
        pageTitle: 'PAGE_TITLE.INVITATIONS'
      }
    })
  }])
  .service('invitationsResolver', InvitationsResolver)
  .name

export default invitationsPageModule

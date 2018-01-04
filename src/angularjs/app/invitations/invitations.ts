import * as angular from 'angular'
import 'angular-touch'
import 'angular-permission'
import modalsModule from '../../common/services/modals/modals'
import {InvitationsResolver} from './invitations.resolver'

export interface IInvitationsStateParams extends ng.ui.IStateParamsService {
  companyId: string
}

const invitationsPageModule = angular.module('profitelo.controller.invitations', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  modalsModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.invitations', {
    url: '/invitations/{token}',
    resolve: {
      /* istanbul ignore next */
      invitations: (invitationsResolver: InvitationsResolver,  $stateParams: IInvitationsStateParams): void =>
        invitationsResolver.resolve($stateParams)
    },
    data: {
      pageTitle: 'PAGE_TITLE.INVITATIONS'
    }
  })
})
.service('invitationsResolver', InvitationsResolver)
  .name

export default invitationsPageModule

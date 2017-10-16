import {InvitationApi, ProfileApi} from 'profitelo-api-ng/api/api'
import {IInvitationsStateParams} from './invitations'
import {ModalsService} from '../../common/services/modals/modals.service'
import {httpCodes} from '../../common/classes/http-codes'
import {LocalStorageWrapper} from '../../common/classes/local-storage-wrapper/localStorageWrapper'
import {UserService} from '../../common/services/user/user.service'
import {GetInvitation, GetProfileWithServicesInvitations} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'

export class InvitationsResolver {

  /* @ngInject */
  constructor(private InvitationApi: InvitationApi,
              private $state: ng.ui.IStateService,
              private modalsService: ModalsService,
              private $log: ng.ILogService,
              private userService: UserService,
              private ProfileApi: ProfileApi) {
  }

  public resolve = (stateParams: IInvitationsStateParams): void => {
    if (stateParams.token) {
      this.InvitationApi.getInvitationRoute(stateParams.token).then((tokenInvitation) => {
        this.userService.getUser().then(() => {
          this.ProfileApi.getProfilesInvitationsRoute().then((invitations) => {
            this.onGetProfileInvitations(invitations, tokenInvitation)
          }, this.onGetProfileInvitationsError)
        }, (error) => this.onGetUserError(error, stateParams, tokenInvitation))
      }, this.onGetInvitationError)
    } else {
      this.$state.go('app.home')
    }
  }

  private onGetProfileInvitationsError = (error: any): void => this.$log.error(error)

  private onGetProfileInvitations =
    (invitations: GetProfileWithServicesInvitations[], tokenInvitation: GetInvitation): void => {
      this.modalsService.createInvitationsModal(
        _.find(invitations, (invitation) => invitation.id === tokenInvitation.serviceOwnerId))
    }

  private onGetUserError = (error: any, stateParams: IInvitationsStateParams, tokenInvitation: GetInvitation): void => {
    if (error.status === httpCodes.unauthorized) {
      LocalStorageWrapper.setItem('invitation', JSON.stringify({
        token: stateParams.token,
        msisdn: tokenInvitation.msisdn,
        email: tokenInvitation.email
      }))
      this.$state.go('app.login.account')
    }
  }

  private onGetInvitationError = (error: any): void => {
    if (error.status === httpCodes.notFound) {
      this.$state.go('app.home')
    } else {
      this.$log.error(error)
    }
  }

}

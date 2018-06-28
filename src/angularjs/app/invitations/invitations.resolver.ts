// tslint:disable:no-any
import { InvitationApi, ProfileApi } from 'profitelo-api-ng/api/api';
import { IInvitationsStateParams } from './invitations';
import { ModalsService } from '../../common/services/modals/modals.service';
import { httpCodes } from '../../common/classes/http-codes';
import { LocalStorageWrapper } from '../../common/classes/local-storage-wrapper/local-storage-wrapper';
import { UserService } from '../../common/services/user/user.service';
import { GetInvitation, GetProfileWithServicesInvitations } from 'profitelo-api-ng/model/models';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { StateService } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class InvitationsResolver {

  public static $inject =
    ['InvitationApi', '$state', 'modalsService', '$log', 'userService', 'ProfileApi', '$location'];

    constructor(private InvitationApi: InvitationApi,
              private $state: StateService,
              private modalsService: ModalsService,
              private $log: ng.ILogService,
              private userService: UserService,
              private ProfileApi: ProfileApi,
              private $location: ng.ILocationService) {
  }

  public resolve = (stateParams: IInvitationsStateParams): void => {
    if (stateParams.token) {
      this.InvitationApi.getInvitationRoute(stateParams.token).then((tokenInvitation) => {
        this.userService.getUser().then(() => {
          this.ProfileApi.getProfilesInvitationsRoute().then((invitations) => {
            this.onGetProfileInvitations(invitations, tokenInvitation);
          }, this.onGetProfileInvitationsError);
        }, (error) => this.onGetUserError(error, stateParams, tokenInvitation));
      }, this.onGetInvitationError);
    } else {
      this.$state.go('app.home');
    }
  }

  private onGetProfileInvitationsError = (error: any): void => this.$log.error(error);

  private onGetProfileInvitations =
    (invitations: GetProfileWithServicesInvitations[], tokenInvitation: GetInvitation): void => {
      this.modalsService.createInvitationsModal(
        _.find(invitations, (invitation) => invitation.profile.id === tokenInvitation.serviceOwnerId));
    }

  private onGetUserError = (error: any, stateParams: IInvitationsStateParams, tokenInvitation: GetInvitation): void => {
    if (error.status === httpCodes.unauthorized) {
      LocalStorageWrapper.setItem('invitation', JSON.stringify({
        token: stateParams.token,
        msisdn: tokenInvitation.msisdn,
        email: tokenInvitation.email
      }));
      this.$location.path('/login');
    }
  }

  private onGetInvitationError = (error: any): void => {
    if (error.status === httpCodes.notFound) {
      this.$state.go('app.home');
    } else {
      this.$log.error(error);
    }
  }

}

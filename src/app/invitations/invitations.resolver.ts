import {ProfileApi} from 'profitelo-api-ng/api/api'
import {IInvitationsStateParams} from './invitations'
import {GetProfileWithServicesEmployments} from 'profitelo-api-ng/model/models'
import {ModalsService} from '../../common/services/modals/modals.service'
import * as _ from 'lodash'

export class InvitationsResolver {

  private currentCompany?: GetProfileWithServicesEmployments
  /* @ngInject */
  constructor(private ProfileApi: ProfileApi, private $state: ng.ui.IStateService,
              private modalsService: ModalsService) {
  }

  public resolve = (stateParams: IInvitationsStateParams): void => {
    this.ProfileApi.getProfilesInvitationsRoute().then((response) => {
      this.currentCompany = _.find(response, (invitationCompany) => invitationCompany.id === stateParams.companyId)
      this.modalsService.createInvitationsModal(this.currentCompany)
    }, (_error) => {
      this.$state.go('app.home')
    })
  }

}

import {ProfileApi} from 'profitelo-api-ng/api/api'
import {IInvitationsStateParams} from './invitations'
import {GetProfileWithServicesEmployments} from 'profitelo-api-ng/model/models'
import {ModalsService} from '../../common/services/modals/modals.service'
import * as _ from 'lodash'
import {httpCodes} from '../../common/classes/http-codes'
import {LocalStorageWrapper} from '../../common/classes/local-storage-wrapper/localStorageWrapper'

export class InvitationsResolver {

  private currentCompany?: GetProfileWithServicesEmployments
  /* @ngInject */
  constructor(private ProfileApi: ProfileApi,
              private $state: ng.ui.IStateService,
              private modalsService: ModalsService,
              private $log: ng.ILogService) {
  }

  public resolve = (stateParams: IInvitationsStateParams): void => {
    this.ProfileApi.getProfilesInvitationsRoute().then((response) => {
      this.currentCompany = _.find(response, (invitationCompany) => invitationCompany.id === stateParams.companyId)
      this.modalsService.createInvitationsModal(this.currentCompany)
    }, (error) => {
      if (error.status === httpCodes.unauthorized) {
        LocalStorageWrapper.setItem('invitation', stateParams.companyId)
        this.$state.go('app.login.account')
      } else {
        this.$log.error(error)
      }
    })
  }

}

import {InvitationApi} from 'profitelo-api-ng/api/api'
import {IInvitationsStateParams} from './invitations'
import {ModalsService} from '../../common/services/modals/modals.service'
import {httpCodes} from '../../common/classes/http-codes'
import {LocalStorageWrapper} from '../../common/classes/local-storage-wrapper/localStorageWrapper'

export class InvitationsResolver {

  /* @ngInject */
  constructor(private InvitationApi: InvitationApi,
              private $state: ng.ui.IStateService,
              private modalsService: ModalsService,
              private $log: ng.ILogService) {
  }

  public resolve = (stateParams: IInvitationsStateParams): void => {
    this.InvitationApi.getInvitationRoute(stateParams.token).then((response) => {
      this.modalsService.createInvitationsModal(response)
    }, (error) => {
      if (error.status === httpCodes.unauthorized) {
        LocalStorageWrapper.setItem('invitation', stateParams.token)
        this.$state.go('app.login.account')
      } else {
        this.$log.error(error)
      }
    })
  }

}

import {IPendingInvitationComponentBindings} from './pending-invitation'
import {InvitationApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../../../../../services/error-handler/error-handler.service'
import {TopAlertService} from '../../../../../services/top-alert/top-alert.service'
import {TranslatorService} from '../../../../../services/translator/translator.service'
import {GetInvitation} from 'profitelo-api-ng/model/models';

export interface IPendingInvitationComponentControllerScope extends ng.IScope {
  invitations: GetInvitation[],
  onDeleteCallback: () => void
}

export class PendingInvitationComponentController implements IPendingInvitationComponentBindings {

  public invitations: GetInvitation[]
  public onDeleteCallback: () => void
  public emailOrMsisdn?: string
  public invitationsCount: number
  public areInvitationsDeleted: boolean = false
  public invitationText: string = ''

  private static readonly minRangeOfFewInvitations: number = 2
  private static readonly maxRangeOfFewInvitations: number = 4

  /* @ngInject */
  constructor(
    private InvitationApi: InvitationApi,
              private errorHandler: ErrorHandlerService,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService
  ) {
  }

  $onInit = (): void => {
    this.invitationsCount = this.invitations.length
    if (this.invitations[0].email !== undefined) {
      this.emailOrMsisdn = this.invitations[0].email
    } else {
      this.emailOrMsisdn = this.invitations[0].msisdn
    }
    switch (true) {
      case this.invitationsCount === 1:
        this.invitationText =  this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.ONE_INVITATION')
        break
      case (this.invitationsCount >= PendingInvitationComponentController.minRangeOfFewInvitations
        && this.invitationsCount <= PendingInvitationComponentController.maxRangeOfFewInvitations):
        this.invitationText = this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.FEW_INVITATIONS')
        break
      default:
        this.invitationText =
          this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.MANY_INVITATIONS')
        break
    }
  }

  public deleteInvitations = (): void => {
    const confirmWindowMessage: string =
      this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.DELETE_INVITATION.CONFIRMATION_MESSAGE')
    if (confirm(confirmWindowMessage)) {
      const invitationsToDelete = this.invitations.map(invitation => invitation.id)
      this.InvitationApi.deleteInvitationsRoute({invitationsIds: invitationsToDelete})
        .then(() => {
          this.topAlertService.success({
            message:
              this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.DELETE_INVITATION.SUCCESS_MESSAGE'),
            timeout: 2
          })
          this.areInvitationsDeleted = true
          this.onDeleteCallback()
        })
        .catch((error) => {
          this.errorHandler.handleServerError(error, 'Can not delete invitations')
        })
    }
  }

}

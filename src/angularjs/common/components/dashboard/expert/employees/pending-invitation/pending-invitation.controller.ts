// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:prefer-conditional-expression
// tslint:disable:no-shadowed-variable
// tslint:disable:newline-before-return
// tslint:disable:curly
import { IPendingInvitationComponentBindings } from './pending-invitation';
import { InvitationApi } from 'profitelo-api-ng/api/api';
import { ErrorHandlerService } from '../../../../../services/error-handler/error-handler.service';
import { TopAlertService } from '../../../../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../../../../services/translator/translator.service';
import { GetInvitation } from 'profitelo-api-ng/model/models';
import { ModalsService } from '../../../../../services/modals/modals.service';

export interface IPendingInvitationComponentControllerScope extends ng.IScope {
  invitations: GetInvitation[];
  onDeleteCallback: () => void;
}

// tslint:disable:member-ordering
export class PendingInvitationComponentController implements IPendingInvitationComponentBindings {

  public invitations: GetInvitation[] = [];
  public onDeleteCallback: () => void;
  public emailOrMsisdn?: string;
  public invitationsCount: number;
  public areInvitationsDeleted = false;
  public invitationText = '';

  private static readonly minRangeOfFewInvitations = 2;
  private static readonly maxRangeOfFewInvitations = 4;

  public static $inject = ['InvitationApi', 'errorHandler', 'topAlertService', 'translatorService', 'modalsService'];

  constructor(private InvitationApi: InvitationApi,
              private errorHandler: ErrorHandlerService,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private modalsService: ModalsService) {
  }

  public $onInit = (): void => {
    this.invitationsCount = this.invitations.length;
    if (this.invitations[0].email !== undefined) {
      this.emailOrMsisdn = this.invitations[0].email;
    } else {
      this.emailOrMsisdn = this.invitations[0].msisdn;
    }
    this.invitationText = this.setInvitationText(this.invitationsCount);
  }

  public deleteInvitations = (): void => {
    this.modalsService.createConfirmAlertModal(
      'DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.DELETE_INVITATION.CONFIRMATION_MESSAGE', () => {
        const invitationsToDelete = this.invitations.map(invitation => invitation.id);
        this.InvitationApi.deleteInvitationsRoute({invitationsIds: invitationsToDelete})
          .then(() => {
            this.topAlertService.success({
              message:
                this.translatorService.translate(
                  'DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.DELETE_INVITATION.SUCCESS_MESSAGE'),
              timeout: 2
            });
            this.areInvitationsDeleted = true;
            this.onDeleteCallback();
          })
          .catch((error) => {
            this.errorHandler.handleServerError(error, 'Can not delete invitations');
          });
      });
  }

  private setInvitationText = (invitationsCount: number): string => {
    if (invitationsCount === 1)
      return this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.ONE_INVITATION');
    else if (invitationsCount >= PendingInvitationComponentController.minRangeOfFewInvitations
      && invitationsCount <= PendingInvitationComponentController.maxRangeOfFewInvitations)
      return this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.FEW_INVITATIONS');
    return this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.MANY_INVITATIONS');
  }

}

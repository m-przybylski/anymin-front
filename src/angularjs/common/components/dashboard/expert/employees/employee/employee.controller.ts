import { IExpertEmployeeComponentBindings } from './employee';
import { GetProfileDetailsWithEmployments } from 'profitelo-api-ng/model/models';
import { EmploymentApi } from 'profitelo-api-ng/api/api';
import { ErrorHandlerService } from '../../../../../services/error-handler/error-handler.service';
import { TopAlertService } from '../../../../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../../../../services/translator/translator.service';

export interface IExpertEmployeeComponentControllerScope extends ng.IScope {
  profileWithEmployments: GetProfileDetailsWithEmployments;
  onDeleteCallback: () => void;
}

// tslint:disable:member-ordering
export class ExpertEmployeeComponentController implements IExpertEmployeeComponentBindings {

  public profileWithEmployments: GetProfileDetailsWithEmployments;
  public onDeleteCallback: () => void;
  public employeeName: string;
  public employmentsCount: number;
  public employeeAvatar: string;
  public isEmploeeDeleted = false;
  public consultationText = '';

  private static readonly minRangeOfFewConsultations = 2;
  private static readonly maxRangeOfFewConsultations = 4;

  public static $inject = ['EmploymentApi', 'errorHandler', 'topAlertService', 'translatorService'];

    constructor(private EmploymentApi: EmploymentApi,
              private errorHandler: ErrorHandlerService,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService) {
  }

  public $onInit = (): void => {
    this.employeeName = this.profileWithEmployments.expertProfile.name;
    this.employeeAvatar = this.profileWithEmployments.expertProfile.img;
    this.employmentsCount = this.profileWithEmployments.employments.length;
    switch (true) {
      case this.employmentsCount === 1:
        this.consultationText = this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.ONE_CONSULTATION');
        break;
      case (this.employmentsCount >= ExpertEmployeeComponentController.minRangeOfFewConsultations
        && this.employmentsCount <= ExpertEmployeeComponentController.maxRangeOfFewConsultations):
        this.consultationText =
          this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.FEW_CONSULTATIONS');
        break;
      default:
        this.consultationText =
          this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.MANY_CONSULTATIONS');
    }
  }

  public deleteEmployee = (): void => {
    const confirmWindowMessage =
      this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.DELETE_EMPLOYEE.CONFIRM_TEXT');
    if (confirm(confirmWindowMessage)) {
      const employmentsToDelete = this.profileWithEmployments.employments.map(employment =>
        employment.id
      );
      this.EmploymentApi.deleteEmploymentsRoute({employmentIds: employmentsToDelete})
        .then(() => {
          this.topAlertService.success({
            message:
              this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.DELETE_EMPLOYEE.SUCCESS_MESSAGE'),
            timeout: 2
          });
          this.isEmploeeDeleted = true;
          this.onDeleteCallback();
        })
        .catch((error) => {
          this.errorHandler.handleServerError(error, 'Can not delete employments',
            'DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.DELETE_EMPLOYEE.ERROR_MESSAGE');
        });
    }
  }

}

// tslint:disable:no-shadowed-variable
// tslint:disable:no-any
import { IExpertEmployeeComponentBindings } from './employee';
import { EmploymentApi } from 'profitelo-api-ng/api/api';
import { ErrorHandlerService } from '../../../../../services/error-handler/error-handler.service';
import { TopAlertService } from '../../../../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../../../../services/translator/translator.service';
import { ModalsService } from '../../../../../services/modals/modals.service';
import { IEmployee } from '../../../../../../app/dashboard/expert/employees/employees.controller';

export interface IExpertEmployeeComponentControllerScope extends ng.IScope {
  profileWithEmployments: IEmployee;
  onDeleteCallback: () => void;
}

// tslint:disable:member-ordering
export class ExpertEmployeeComponentController implements IExpertEmployeeComponentBindings {

  public profileWithEmployments: IEmployee;
  public onDeleteCallback: () => void;
  public employeeName: string;
  public employmentsCount: number;
  public employeeAvatar: string;
  public isEmploeeDeleted = false;
  public consultationText = '';
  public employeeConsultations: any[];

  private static readonly minRangeOfFewConsultations = 2;
  private static readonly maxRangeOfFewConsultations = 4;

  public static $inject = ['EmploymentApi', 'errorHandler', 'topAlertService', 'translatorService', 'modalsService'];

  constructor(private EmploymentApi: EmploymentApi,
              private errorHandler: ErrorHandlerService,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private modalsService: ModalsService) {
  }

  public $onInit = (): void => {
    this.employeeName = this.profileWithEmployments.employeeName;
    this.employeeAvatar = this.profileWithEmployments.employeeAvatar;
    this.employmentsCount = this.profileWithEmployments.employmentsId.length;
    this.employeeConsultations = this.profileWithEmployments.services;

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
    this.modalsService.createConfirmAlertModal('DASHBOARD.EXPERT_ACCOUNT.EMPLOYEES.DELETE_EMPLOYEE.CONFIRM_TEXT',
      () => {
        const employmentsToDelete = this.profileWithEmployments.employmentsId;
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
      });

  }

}

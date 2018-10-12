// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
import { ISingleConsultationEditComponentBindings } from './single-consultation-edit';
import { PostService, PostServiceTag, MoneyDto } from 'profitelo-api-ng/model/models';
import { TranslatorService } from '../../../../services/translator/translator.service';
import { ModalsService } from '../../../../services/modals/modals.service';

// tslint:disable:strict-type-predicates
// tslint:disable:member-ordering
export class SingleConsultationEditComponentController implements ISingleConsultationEditComponentBindings {
  public service: PostService;
  public tagsList: PostServiceTag[];
  public employeeList: string[];
  public name: string;
  public price: MoneyDto;
  public onRemove: (service: PostService) => void;
  public onEdit: (service: PostService) => void;
  public isOwnerEmployee = false;
  public isCompany: boolean;
  public language: string;
  public description: string;

  public static $inject = ['translatorService', 'modalsService'];

  constructor(private translatorService: TranslatorService, private modalsService: ModalsService) {}

  public $onInit(): void {
    this.tagsList = this.service.tags;
    this.employeeList = [];
    if (this.service.invitations) {
      this.service.invitations.forEach(invitation => {
        if (invitation.email) {
          this.employeeList.push(invitation.email);
        } else if (invitation.msisdn) {
          this.employeeList.push(invitation.msisdn);
        }
      });
    }
    this.name = this.service.name;
    this.price = this.service.price;
    this.isOwnerEmployee = this.service.isOwnerEmployee;
    this.language = this.translatorService.translate('LANGUAGE.' + this.service.language);
    this.description = this.service.description;
  }

  public removeConsultation = (): void => {
    if (this.checkIsOnRemoveExist()) {
      this.modalsService.createConfirmAlertModal('WIZARD.SUMMARY.DELETE_SERVICE.BUTTON.CONFIRMATION_MESSAGE', () => {
        this.onRemove(this.service);
      });
    }
  };

  public editConsultation = (): void => {
    if (this.checkIsOnEditExist()) {
      this.onEdit(this.service);
    }
  };

  public checkIsOnRemoveExist = (): boolean => this.onRemove && typeof this.onRemove === 'function';

  public checkIsOnEditExist = (): boolean => this.onEdit && typeof this.onEdit === 'function';
}

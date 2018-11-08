// tslint:disable:readonly-array
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Alerts, AlertService, FormUtilsService, LoggerFactory } from '@anymind-ng/core';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { Observable, EMPTY } from 'rxjs';
import { Config } from '../../../../../config';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostServiceTag } from '@anymind-ng/api/model/postServiceTag';
import { PostService } from '@anymind-ng/api/model/postService';
import { catchError } from 'rxjs/operators';
import { CreateEditConsultationService } from './create-edit-consultation.service';
import { EmployeesInviteModalComponent } from '../invitations/employees-invite/employees-invite.component';
import { GetService, PutService } from '@anymind-ng/api';
import { ServiceWithOwnerProfile } from 'profitelo-api-ng/model/ServiceWithOwnerProfile';
import { Logger } from '@platform/core/logger';
import { CONSULTATIONDETAILS } from './create-edit-consultation';
import { COMMISSION, ICommission } from '@platform/core/commission';

export interface ICreateEditConsultationPayload {
  isExpertConsultation: boolean;
  serviceDetails?: ServiceWithOwnerProfile;
  tags?: ReadonlyArray<string>;
  isOwnerEmployee: boolean;
}

@Component({
  selector: 'plat-create-edit-consultation',
  templateUrl: './create-edit-consultation.component.html',
  styleUrls: ['./create-edit-consultation.component.sass'],
  providers: [CreateEditConsultationService],
})
export class CreateEditConsultationModalComponent extends Logger implements OnInit, AfterViewInit {
  public readonly formId = 'createExpertConsultation';
  public readonly nameControlName = 'name';
  public readonly descriptionControlName = 'description';
  public readonly tagControlName = 'tag';
  public readonly priceWithoutCommissionControlName = 'withoutCommissionPrice';
  public readonly grossPriceControlName = 'grossPrice';
  public readonly nettPriceControlName = 'nettPrice';
  public readonly minValidNameLength = Config.inputsLengthNumbers.consultationMinName;
  public readonly maxValidNameLength = Config.inputsLengthNumbers.consultationMaxName;
  public readonly minValidDescriptionLength = Config.inputsLengthNumbers.consultationMinDescription;
  public readonly maxValidDescriptionLength = Config.inputsLengthNumbers.consultationMaxDescription;
  public createConsultationForm: FormGroup = new FormGroup({});
  public isRequestPending = false;
  public isFreelance = false;
  public totalCommission: number;
  public labelTrKey: string;
  public tagNames: ReadonlyArray<string> = [];
  public grossPrice: number;
  public modalHeaderTrKey = 'CREATE_EXPERT_CONSULTATION.HEADER.TITLE';
  public isEditModal = false;

  private readonly polishCurrency = 'PLN';
  private readonly polandISOcode = 'pl';
  private readonly labelTranslations = {
    employeeConsultation: 'CREATE_COMPANY_CONSULTATION.PRICE_SECTION.NET_PRICE_LABEL',
    freelanceConsultation: 'CREATE_COMPANY_CONSULTATION.PRICE_SECTION.FREELANCER_NET_PRICE_LABEL',
  };
  private readonly editConsultationTrKey = 'EDIT_EXPERT_CONSULTATION.HEADER.TITLE';
  private selectedTags: PostServiceTag[] = [];
  private anyMindCommission: number;
  private formControls = this.createConsultationForm.controls;
  private successAlertTrKey: string = Alerts.CreateConsultationSuccess;

  constructor(
    private formUtils: FormUtilsService,
    private createEditConsultationService: CreateEditConsultationService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private changeDetector: ChangeDetectorRef,
    @Inject(CONSULTATIONDETAILS) public payload: ICreateEditConsultationPayload,
    @Inject(COMMISSION) private commissionConfig: ICommission,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CreateEditConsultationModalComponent'));
  }

  public ngOnInit(): void {
    this.assignInitialData();
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.onModalContentChange().next(false);
    this.assignValues();
  }

  public onFormSubmit = (): void => {
    if (this.createConsultationForm.valid) {
      this.isRequestPending = true;
      /**
       * if serviceDetails has not been specified,
       * it means that it creates a new consultation
       * instead of editing the existing one
       */
      if (typeof this.payload.serviceDetails === 'undefined') {
        this.createEditConsultationService
          .createService(this.getPostServiceModel())
          .pipe(catchError(this.handleError))
          .subscribe(this.handleResponse);

        return;
      }
      this.createEditConsultationService
        .updateServiceDetails(this.payload.serviceDetails.id, this.getPutServiceModel())
        .pipe(catchError(this.handleError))
        .subscribe(this.handleResponse);
    } else {
      this.formUtils.validateAllFormFields(this.createConsultationForm);
    }
  };

  public onSelectedTag = (tagsNames: ReadonlyArray<string>): void => {
    this.selectedTags = tagsNames.map(tagName => ({ name: tagName }));
  };

  public onEmployeeConsultation = (): void => {
    if (!this.isRequestPending && typeof this.payload.serviceDetails === 'undefined') {
      this.isFreelance = false;
      this.totalCommission = this.commissionConfig.employeeServiceAnyMindCommission;
      this.anyMindCommission = this.commissionConfig.employeeServiceAnyMindCommission;
      this.labelTrKey = this.labelTranslations.employeeConsultation;
      this.clearPriceInputs();
    }
  };

  public onFreelanceConsultation = (): void => {
    if (!this.isRequestPending && typeof this.payload.serviceDetails === 'undefined') {
      this.isFreelance = true;
      this.anyMindCommission = this.commissionConfig.freelanceConsultationAnyMindCommission;
      this.totalCommission = parseFloat(
        (
          this.commissionConfig.freelanceConsultationAnyMindCommission +
          this.commissionConfig.freelanceConsultationCompanyCommission
        ).toFixed(this.commissionConfig.numberPrecision),
      );
      this.labelTrKey = this.labelTranslations.freelanceConsultation;
      this.clearPriceInputs();
    }
  };

  public getCommissionValueForUI = (): string => `${this.anyMindCommission * this.commissionConfig.percentDivider}%`;

  public getCompanyProfitForUI = (): string => {
    const nett = this.formControls[this.nettPriceControlName].value;
    const companyProfit = this.createEditConsultationService.getCompanyProfit(
      nett,
      this.commissionConfig.freelanceConsultationCompanyCommission,
    );

    return `${companyProfit.toPrecision(this.commissionConfig.numberPrecision)} zł`;
  };

  public deleteConsultation = (serviceId: string): void => {
    this.createEditConsultationService.deleteService(serviceId).subscribe(() => {
      this.activeModal.close(true);
      this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.ALERT.REMOVE_SUCCESS');
      this.loggerService.debug('Consultation removed!');
    });
  };

  private getPostServiceModel = (): PostService => ({
    ...this.getPutServiceModel(),
    ...{ isFreelance: this.isFreelance },
  });

  private getPutServiceModel = (): PutService => ({
    // TODO remove invitations after https://anymind.atlassian.net/browse/PLAT-538
    invitations: [],
    isOwnerEmployee: this.payload.isOwnerEmployee,
    name: this.formControls[this.nameControlName].value,
    description: this.formControls[this.descriptionControlName].value,
    price: {
      amount: this.formControls[this.nettPriceControlName].value,
      currency: this.polishCurrency,
    },
    tags: [...this.selectedTags],
    language: this.polandISOcode,
  });

  private handleError = (error: HttpErrorResponse): Observable<void> => {
    this.isRequestPending = false;
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.loggerService.warn('error when try to create service', error);

    return EMPTY;
  };

  private clearPriceInputs = (): void => {
    this.formControls[this.nettPriceControlName].reset('');
    this.formControls[this.priceWithoutCommissionControlName].reset('');
    this.formControls[this.grossPriceControlName].reset('');
  };

  private assignInitialData = (): void => {
    this.totalCommission = this.commissionConfig.employeeServiceAnyMindCommission;
    this.anyMindCommission = this.commissionConfig.employeeServiceAnyMindCommission;
    this.labelTrKey = this.labelTranslations.employeeConsultation;
    if (typeof this.payload.tags !== 'undefined') {
      this.tagNames = this.payload.tags;
      this.onSelectedTag(this.payload.tags);
    }
  };

  private handleResponse = (serviceDetails: GetService): void => {
    this.isRequestPending = false;
    this.alertService.pushSuccessAlert(this.successAlertTrKey);
    this.activeModal.close(true);
    if (!this.payload.isExpertConsultation) {
      this.modalService.open(EmployeesInviteModalComponent).componentInstance.serviceId = serviceDetails.id;
    }
  };

  private assignValues = (): void => {
    const serviceDetails = this.payload.serviceDetails;
    if (typeof serviceDetails !== 'undefined') {
      this.isEditModal = true;
      this.grossPrice = serviceDetails.grossPrice.amount / this.commissionConfig.moneyDivider;
      this.formControls[this.nameControlName].setValue(serviceDetails.name);
      this.formControls[this.descriptionControlName].setValue(serviceDetails.description);
      this.formControls[this.grossPriceControlName].setValue(this.grossPrice);
      this.successAlertTrKey = 'ALERT.EDIT_CONSULTATION.SUCCESS';
      this.modalHeaderTrKey = this.editConsultationTrKey;
      if (serviceDetails.isFreelance) {
        this.isFreelance = true;
        this.anyMindCommission = this.commissionConfig.freelanceConsultationAnyMindCommission;
        this.totalCommission = parseFloat(
          (
            this.commissionConfig.freelanceConsultationAnyMindCommission +
            this.commissionConfig.freelanceConsultationCompanyCommission
          ).toFixed(this.commissionConfig.numberPrecision),
        );
        this.labelTrKey = this.labelTranslations.freelanceConsultation;
      }
    }
    this.changeDetector.detectChanges();
  };
}

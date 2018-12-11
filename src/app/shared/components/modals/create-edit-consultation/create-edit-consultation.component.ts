// tslint:disable:readonly-array
// tslint:disable:max-file-line-count
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { Alerts, AlertService, FormUtilsService, LoggerFactory } from '@anymind-ng/core';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { Observable, EMPTY } from 'rxjs';
import { Config } from '../../../../../config';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PostServiceTag } from '@anymind-ng/api/model/postServiceTag';
import { PostService } from '@anymind-ng/api/model/postService';
import { catchError } from 'rxjs/operators';
import { CreateEditConsultationService } from './create-edit-consultation.service';
import {
  EmployeesInviteModalComponent,
  IEmployeeInvitePayload,
} from '../invitations/employees-invite/employees-invite.component';
import { GetInvitation, GetService, PutService, ServiceWithOwnerProfile } from '@anymind-ng/api';
import { Logger } from '@platform/core/logger';
import { CONSULTATION_DETAILS } from './create-edit-consultation';
import { COMMISSION, ICommission } from '@platform/core/commission';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { INVITATION_PAYLOAD } from '@platform/shared/components/modals/invitations/employees-invite/employee-invite';

export interface ICreateEditConsultationPayload {
  isExpertConsultation: boolean;
  isOwnerEmployee: boolean;
  serviceDetails?: ServiceWithOwnerProfile;
  tags?: ReadonlyArray<string>;
  pendingInvitations?: GetInvitation[];
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
  public nettPrice: number;
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
    private injector: Injector,
    @Inject(CONSULTATION_DETAILS) public payload: ICreateEditConsultationPayload,
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

  public getCommissionValueForUI = (): string =>
    `${(this.anyMindCommission * this.commissionConfig.percentDivider).toFixed(
      this.commissionConfig.numberPrecision,
    )}%`;

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

  private handleError = (httpError: HttpErrorResponse): Observable<void> => {
    this.isRequestPending = false;
    this.loggerService.warn('error when try to create service', httpError);

    const err = httpError.error;
    if (isBackendError(err)) {
      if (err.code === BackendErrors.InvalidServicePrice) {
        this.alertService.pushDangerAlert('ALERT.NOT_ALLOWED_TO_CREATE_FREE_CONSULTATION');

        return EMPTY;
      }
    }
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return EMPTY;
  };

  private clearPriceInputs = (): void => {
    this.formControls[this.nettPriceControlName].reset('');
    this.formControls[this.priceWithoutCommissionControlName].reset('');
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
      const payload: IEmployeeInvitePayload = {
        serviceId: serviceDetails.id,
        isFreelanceService: serviceDetails.isFreelance,
      };
      const modalOptions: NgbModalOptions = {
        injector: Injector.create({
          providers: [{ provide: INVITATION_PAYLOAD, useValue: payload }],
          parent: this.injector,
        }),
      };
      this.modalService.open(EmployeesInviteModalComponent, modalOptions);
    }
  };

  private assignValues = (): void => {
    const serviceDetails = this.payload.serviceDetails;
    if (typeof serviceDetails !== 'undefined') {
      this.isEditModal = true;
      // TODO FIX_NEW_FINANCE_MODEL - price is gross
      this.nettPrice = serviceDetails.price.amount / this.commissionConfig.moneyDivider;
      this.formControls[this.nameControlName].setValue(serviceDetails.name);
      this.formControls[this.descriptionControlName].setValue(serviceDetails.description);
      this.formControls[this.nettPriceControlName].setValue(serviceDetails.price.amount);
      this.formControls[this.priceWithoutCommissionControlName].setValue(
        this.createEditConsultationService.getInputPriceModel(this.nettPrice),
      );
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

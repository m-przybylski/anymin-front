// tslint:disable:readonly-array
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { Alerts, AlertService, FormUtilsService, LoggerFactory } from '@anymind-ng/core';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { EMPTY, Observable } from 'rxjs';
import { Config } from '../../../../../config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PostServiceTag } from '@anymind-ng/api/model/postServiceTag';
import { PostService } from '@anymind-ng/api/model/postService';
import { catchError, map } from 'rxjs/operators';
import { CreateEditConsultationService } from './create-edit-consultation.service';
import {
  EmployeesInviteModalComponent,
  IEmployeeInvitePayload,
} from '../invitations/employees-invite/employees-invite.component';
import { GetInvitation, PutService, ServiceWithOwnerProfile } from '@anymind-ng/api';
import { Logger } from '@platform/core/logger';
import { CONSULTATION_DETAILS } from './create-edit-consultation';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { INVITATION_PAYLOAD } from '@platform/shared/components/modals/invitations/employees-invite/employee-invite';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip-injector.service';
import { ConsultationDetailActions } from '../consultation-details/actions';

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
  public readonly formId = 'consultationForm';
  public readonly nameControlName = 'name';
  public readonly descriptionControlName = 'description';
  public readonly tagControlName = 'tag';
  public readonly priceControlName = 'price';
  public readonly minValidNameLength = Config.inputsLengthNumbers.consultationMinName;
  public readonly maxValidNameLength = Config.inputsLengthNumbers.consultationMaxName;
  public readonly minValidDescriptionLength = Config.inputsLengthNumbers.consultationMinDescription;
  public readonly maxValidDescriptionLength = Config.inputsLengthNumbers.consultationMaxDescription;
  public priceControl = new FormControl('', Validators.required);
  public consultationForm: FormGroup = new FormGroup({});
  public isRequestPending = false;
  public isFreelance = false;
  public tagNames: ReadonlyArray<string> = [];
  public consultationPrice: number;
  public modalHeaderTrKey = 'CREATE_EXPERT_CONSULTATION.HEADER.TITLE';
  public isEditModal = false;
  public isCompanyService = false;
  public tooltipType: TooltipComponentDestinationEnum = TooltipComponentDestinationEnum.MODAL;
  private readonly polishCurrency = 'PLN';
  private readonly polandISOcode = 'pl';
  private readonly editConsultationTrKey = 'EDIT_EXPERT_CONSULTATION.HEADER.TITLE';
  private selectedTags: PostServiceTag[] = [];
  private formControls = this.consultationForm.controls;
  private successAlertTrKey: string = Alerts.CreateConsultationSuccess;
  private profileId: string;

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
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CreateEditConsultationModalComponent'));
  }

  public ngOnInit(): void {
    this.isCompanyService = !this.payload.isExpertConsultation;
    if (typeof this.payload.tags !== 'undefined') {
      this.tagNames = this.payload.tags;
      this.onSelectedTag(this.payload.tags);
    }
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.onModalContentChange().next(false);
    this.assignValues();
  }

  public onFormSubmit(): void {
    if (this.consultationForm.valid) {
      this.isRequestPending = true;
      /**
       * if serviceDetails has not been specified,
       * it means that it creates a new consultation
       * instead of editing the existing one
       */
      const createService =
        typeof this.payload.serviceDetails === 'undefined'
          ? this.createEditConsultationService
              .createService(this.getPostServiceModel())
              .pipe(map(service => new ConsultationDetailActions.AddConsultationAction(service)))
          : this.createEditConsultationService
              .updateServiceDetails(this.payload.serviceDetails.id, this.getPutServiceModel())
              .pipe(map(service => new ConsultationDetailActions.EditConsultationAction(service)));

      createService
        .pipe(catchError(err => this.handleError(err)))
        .subscribe(serviceDetails => this.onConsultationCreate(serviceDetails));
    } else {
      this.formUtils.validateAllFormFields(this.consultationForm);
    }
  }

  public onSelectedTag(tagsNames: ReadonlyArray<string>): void {
    this.selectedTags = tagsNames.map(tagName => ({ name: tagName }));
  }

  public onEmployeeConsultation(): void {
    if (!this.isRequestPending && typeof this.payload.serviceDetails === 'undefined') {
      this.isFreelance = false;
    }
  }

  public onFreelanceConsultation(): void {
    if (!this.isRequestPending && typeof this.payload.serviceDetails === 'undefined') {
      this.isFreelance = true;
    }
  }

  public deleteConsultation(serviceId: string): void {
    this.createEditConsultationService.deleteService(serviceId).subscribe(() => {
      this.activeModal.close(new ConsultationDetailActions.DeleteConsultationAction(serviceId));
      this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.ALERT.REMOVE_SUCCESS');
      this.loggerService.debug('Consultation removed!');
    });
  };

  private getPostServiceModel(): PostService {
    return {
    ...this.getPutServiceModel(),
    ...{ isFreelance: this.isFreelance, profileId: this.profileId },
  }};

  private getPutServiceModel(): PutService {return {
    isOwnerEmployee: this.payload.isOwnerEmployee,
    name: this.formControls[this.nameControlName].value,
    description: this.formControls[this.descriptionControlName].value,
    /**
     * Value of priceControl is string
     * so we have to convert it to number and multiply by moneyDivider
     * as it is accepted value for backend
     */
    price: {
      value: Number(this.formControls[this.priceControlName].value.replace(',', '.')) * Config.moneyDivider,
      currency: this.polishCurrency,
    },
    tags: [...this.selectedTags],
    language: this.polandISOcode,
  }};

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
  }

  private onConsultationCreate(
    action: ConsultationDetailActions.EditConsultationAction | ConsultationDetailActions.AddConsultationAction,
  ): void {
    this.isRequestPending = false;
    this.alertService.pushSuccessAlert(this.successAlertTrKey);
    this.activeModal.close(action);
    if (!this.payload.isExpertConsultation) {
      const payload: IEmployeeInvitePayload = {
        serviceId: action.payload.id,
        isFreelanceService: action.payload.isFreelance,
      };
      const modalOptions: NgbModalOptions = {
        injector: Injector.create({
          providers: [{ provide: INVITATION_PAYLOAD, useValue: payload }],
          parent: this.injector,
        }),
      };
      this.modalService.open(EmployeesInviteModalComponent, modalOptions);
    }
  }

  private assignValues(): void {
    const serviceDetails = this.payload.serviceDetails;
    if (typeof serviceDetails !== 'undefined') {
      this.isEditModal = true;
      this.consultationPrice = serviceDetails.price.value;
      this.formControls[this.nameControlName].setValue(serviceDetails.name);
      this.formControls[this.descriptionControlName].setValue(serviceDetails.description);
      this.successAlertTrKey = 'ALERT.EDIT_CONSULTATION.SUCCESS';
      this.modalHeaderTrKey = this.editConsultationTrKey;
      if (serviceDetails.isFreelance) {
        this.isFreelance = true;
      }
    }
    this.changeDetector.detectChanges();
  }
}

// tslint:disable:readonly-array
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CreateExpertConsultationModalService } from './create-expert-consultation.service';
import { FormGroup } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Config } from '../../../../../config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/internal/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { PostServiceTag } from '@anymind-ng/api/model/postServiceTag';
import { EMPTY } from 'rxjs/index';
import { Observable } from 'rxjs/Rx';
import { PostService } from '@anymind-ng/api/model/postService';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { CommonConfig } from '../../../../../common-config';

@Component({
  selector: 'plat-create-expert-consultation',
  templateUrl: './create-expert-consultation.component.html',
  styleUrls: ['./create-expert-consultation.component.sass'],
  providers: [CreateExpertConsultationModalService]
})
export class CreateExpertConsultationModalComponent implements OnInit, AfterViewInit {

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
  public createConsultationForm: FormGroup;
  public isRequestPending = false;

  private readonly polishCurrency = 'PLN';
  private readonly polandISOcode = 'pl';
  private readonly isFreelance = false;
  private readonly anyMindCommission: number = CommonConfig.getCommonConfig().config.commissions.default.internal;
  private readonly percentDivider = 100;
  private loggerService: LoggerService;
  private selectedTags: PostServiceTag[] = [];

  constructor(private formUtils: FormUtilsService,
              private createExpertConsultationModalService: CreateExpertConsultationModalService,
              private alertService: AlertService,
              private activeModal: NgbActiveModal,
              private modalAnimationComponentService: ModalAnimationComponentService,
              loggerFactory: LoggerFactory) {
    this.loggerService = loggerFactory.createLoggerService('CreateExpertConsultationModalComponent');
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.isPendingRequest().next(false);
  }

  public ngOnInit(): void {
    this.createConsultationForm = new FormGroup({});
  }

  public onFormSubmit = (): void => {
    if (this.createConsultationForm.valid) {
      this.isRequestPending = true;
      this.createExpertConsultationModalService.createService(this.getServiceModel())
        .pipe(catchError(this.handleCreateServiceError))
        .subscribe(() => {
          this.isRequestPending = false;
          this.alertService.pushSuccessAlert(Alerts.CreateConsultationSuccess);
          this.activeModal.close();
        });
    } else {
      this.formUtils.validateAllFormFields(this.createConsultationForm);
    }
  }

  public onSelectedTag = (tagsNames: string[]): void => {
    this.selectedTags = tagsNames.map(tagName => ({name: tagName}));
  }

  public getCommissionValueForUI = (): string => `${this.anyMindCommission * this.percentDivider}%`;

  private getServiceModel = (): PostService => ({
    // TODO remove invitations after https://anymind.atlassian.net/browse/PLAT-363
    invitations: [],
    isOwnerEmployee: true,
    isFreelance: this.isFreelance,
    name: this.createConsultationForm.controls[this.nameControlName].value,
    description: this.createConsultationForm.controls[this.descriptionControlName].value,
    price: {
      amount: this.createConsultationForm.controls[this.nettPriceControlName].value,
      currency: this.polishCurrency
    },
    tags: this.selectedTags,
    language: this.polandISOcode
  })

  private handleCreateServiceError = (error: HttpErrorResponse): Observable<void> => {
    this.isRequestPending = false;
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.loggerService.warn('error when try to create service', error);

    return EMPTY;
  }

}

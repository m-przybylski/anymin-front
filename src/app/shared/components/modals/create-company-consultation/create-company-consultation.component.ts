// tslint:disable:readonly-array
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { EMPTY } from 'rxjs/index';
import { Config } from '../../../../../config';
import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostServiceTag } from '@anymind-ng/api/model/postServiceTag';
import { PostService } from '@anymind-ng/api/model/postService';
import { catchError } from 'rxjs/internal/operators';
import { CreateCompanyConsultationService } from './create-company-consultation.service';
import { CommonConfig } from '../../../../../common-config';
import { ConfigDEFAULT } from '../../../../../../generated_modules/common-config/common-config.default';
import { EmployeesInviteModalComponent } from '../employees-invite/employees-invite.component';
import { GetService } from '@anymind-ng/api';

@Component({
  selector: 'plat-create-company-consultation',
  templateUrl: './create-company-consultation.component.html',
  styleUrls: ['./create-company-consultation.component.sass'],
  providers: [CreateCompanyConsultationService],
})
export class CreateCompanyConsultationModalComponent implements OnInit, AfterViewInit {
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
  public isFreelance = false;
  public totalCommission: number;
  public labelTrKey: string;

  private readonly polishCurrency = 'PLN';
  private readonly polandISOcode = 'pl';
  private readonly labelTranslations = {
    employeeConsultation: 'CREATE_COMPANY_CONSULTATION.PRICE_SECTION.NET_PRICE_LABEL',
    freelanceConsultation: 'CREATE_COMPANY_CONSULTATION.PRICE_SECTION.FREELANCER_NET_PRICE_LABEL',
  };
  private readonly commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  private readonly freelanceConsultationAnyMindCommission = this.commonConfig.config.commissions.freelance.internal;
  private readonly freelanceConsultationCompanyCommission = this.commonConfig.config.commissions.freelance.organization;
  private readonly employeeServiceAnyMindCommission = this.commonConfig.config.commissions.default.internal;
  private readonly percentDivider = 100;
  private readonly numberPrecision = 2;
  private loggerService: LoggerService;
  private selectedTags: PostServiceTag[] = [];
  private anyMindCommission: number;

  constructor(
    private formUtils: FormUtilsService,
    private createCompanyConsultationService: CreateCompanyConsultationService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.loggerService = loggerFactory.createLoggerService('CreateExpertConsultationModalComponent');
  }

  public ngOnInit(): void {
    this.createConsultationForm = new FormGroup({});
    this.assignInitialData();
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.isPendingRequest().next(false);
  }

  public onFormSubmit = (): void => {
    if (this.createConsultationForm.valid) {
      this.isRequestPending = true;
      this.createCompanyConsultationService
        .createService(this.getServiceModel())
        .pipe(catchError(this.handleCreateServiceError))
        .subscribe((serviceDetails: GetService) => {
          this.isRequestPending = false;
          this.alertService.pushSuccessAlert(Alerts.CreateConsultationSuccess);
          this.modalService.open(EmployeesInviteModalComponent).componentInstance.serviceId = serviceDetails.id;
          this.activeModal.close();
        });
    } else {
      this.formUtils.validateAllFormFields(this.createConsultationForm);
    }
  };

  public onSelectedTag = (tagsNames: string[]): void => {
    this.selectedTags = tagsNames.map(tagName => ({ name: tagName }));
  };

  public onEmployeeConsultation = (): void => {
    if (!this.isRequestPending) {
      this.isFreelance = false;
      this.totalCommission = this.employeeServiceAnyMindCommission;
      this.anyMindCommission = this.employeeServiceAnyMindCommission;
      this.labelTrKey = this.labelTranslations.employeeConsultation;
      this.clearPriceInputs();
    }
  };

  public onFreelanceConsultation = (): void => {
    if (!this.isRequestPending) {
      this.isFreelance = true;
      this.anyMindCommission = this.freelanceConsultationAnyMindCommission;
      this.totalCommission = parseFloat(
        (this.freelanceConsultationAnyMindCommission + this.freelanceConsultationCompanyCommission).toFixed(
          this.numberPrecision,
        ),
      );
      this.labelTrKey = this.labelTranslations.freelanceConsultation;
      this.clearPriceInputs();
    }
  };

  public getCommissionValueForUI = (): string => `${this.anyMindCommission * this.percentDivider}%`;

  public getCompanyProfitForUI = (): string => {
    const nett = this.createConsultationForm.controls[this.nettPriceControlName].value;
    const companyProfit = this.createCompanyConsultationService.getCompanyProfit(
      nett,
      this.freelanceConsultationCompanyCommission,
    );

    return `${companyProfit.toPrecision(this.numberPrecision)} zł`;
  };

  private getServiceModel = (): PostService => ({
    // TODO remove invitations after https://anymind.atlassian.net/browse/PLAT-363
    invitations: [],
    isOwnerEmployee: true,
    isFreelance: false,
    name: this.createConsultationForm.controls[this.nameControlName].value,
    description: this.createConsultationForm.controls[this.descriptionControlName].value,
    price: {
      amount: this.createConsultationForm.controls[this.nettPriceControlName].value,
      currency: this.polishCurrency,
    },
    tags: this.selectedTags,
    language: this.polandISOcode,
  });

  private handleCreateServiceError = (error: HttpErrorResponse): Observable<void> => {
    this.isRequestPending = false;
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.loggerService.warn('error when try to create service', error);

    return EMPTY;
  };

  private clearPriceInputs = (): void => {
    this.createConsultationForm.controls[this.nettPriceControlName].reset('');
    this.createConsultationForm.controls[this.priceWithoutCommissionControlName].reset('');
    this.createConsultationForm.controls[this.grossPriceControlName].reset('');
  };

  private assignInitialData = (): void => {
    this.totalCommission = this.employeeServiceAnyMindCommission;
    this.anyMindCommission = this.employeeServiceAnyMindCommission;
    this.labelTrKey = this.labelTranslations.employeeConsultation;
  };
}

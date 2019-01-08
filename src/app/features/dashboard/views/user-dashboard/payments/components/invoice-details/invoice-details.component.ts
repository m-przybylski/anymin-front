import { Component, OnInit } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import {
  InvoiceDetailsComponentService,
  PostInvoiceDetails,
} from '@platform/features/dashboard/views/user-dashboard/payments/components/invoice-details/invoice-details.component.service';
import { Alerts, AlertService, FormUtilsService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { FormGroup } from '@angular/forms';
import { GetInvoiceDetails, PostCompanyDetails, PostNaturalPersonDetails } from '@anymind-ng/api';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NATURAL_PERSON_FORM_NAME,
  NaturalPersonInvoiceDetailsFormControlNames,
} from '@platform/shared/components/payout-invoice-details/components/natural-person-form/natural-person-form.component';
import {
  COMPANY_FORM_NAME,
  CompanyInvoiceDetailsFormControlNames,
} from '@platform/shared/components/payout-invoice-details/components/company-form/company-form.component';
import { httpCodes } from '@platform/shared/constants/httpCodes';

export interface IInvoiceDetails {
  invoiceDetails: GetInvoiceDetails;
  isCompanyProfile: boolean;
}

@Component({
  selector: 'plat-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.sass'],
  providers: [InvoiceDetailsComponentService],
})
export class InvoiceDetailsComponent extends Logger implements OnInit {
  public invoiceDetails: GetInvoiceDetails;
  public invoiceDetailsForm: FormGroup = new FormGroup({});
  public isRequestPending = false;
  public isCompanyProfile: boolean;

  private readonly firstPartOfPostalCode = 2;
  private readonly updateNaturalPersonInvoiceDetails = this.updateInvoiceDetails(
    NATURAL_PERSON_FORM_NAME,
    (invoiceDetails: PostNaturalPersonDetails) =>
      this.invoiceDetailsService.updateNaturalPersonInvoiceDetails(invoiceDetails),
  );
  private readonly updateCompanyInvoiceDetails = this.updateInvoiceDetails(
    COMPANY_FORM_NAME,
    (invoiceDetails: PostCompanyDetails) => this.invoiceDetailsService.updateCompanyInvoiceDetails(invoiceDetails),
  );

  private invoiceType: GetInvoiceDetails.InvoiceDetailsTypeEnum;

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private invoiceDetailsService: InvoiceDetailsComponentService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    public formUtils: FormUtilsService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('InvoiceDetailsComponent'));
  }

  public ngOnInit(): void {
    this.getInitialData();
  }

  public onSubmit(): void {
    this.invoiceType === GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON
      ? this.updateNaturalPersonInvoiceDetails(() => this.getPostNaturalPersonDetailsModel())
      : this.updateCompanyInvoiceDetails(() => this.getPostCompanyDetailsModel());
  }

  public onSelectInvoiceDetailsType(invoiceType: GetInvoiceDetails.InvoiceDetailsTypeEnum): void {
    this.invoiceType = invoiceType;
  }

  private updateInvoiceDetails(
    formName: string,
    persistInvoiceDetails: (invoiceDetails: PostInvoiceDetails) => Observable<GetInvoiceDetails>,
  ): (getInvoiceDetails: () => PostInvoiceDetails) => void {
    return (getInvoiceDetails: () => PostInvoiceDetails): void => {
      if (this.invoiceDetailsForm.controls[formName].valid) {
        this.isRequestPending = true;
        persistInvoiceDetails(getInvoiceDetails())
          .pipe(
            catchError(this.handleUpdateInvoiceDetailsError),
            finalize(() => {
              this.isRequestPending = false;
            }),
          )
          .subscribe(() => {
            this.onRequestSuccess();
          });
      } else {
        this.formUtils.validateAllFormFields(<FormGroup>this.invoiceDetailsForm.controls[formName]);
      }
    };
  }

  private getPostNaturalPersonDetailsModel(): PostNaturalPersonDetails {
    const formGroup = <FormGroup>this.invoiceDetailsForm.controls[NATURAL_PERSON_FORM_NAME];
    const controls = formGroup.controls;

    return {
      firstName: controls[NaturalPersonInvoiceDetailsFormControlNames.FIRST_NAME].value,
      lastName: controls[NaturalPersonInvoiceDetailsFormControlNames.LAST_NAME].value,
      address: {
        street: controls[NaturalPersonInvoiceDetailsFormControlNames.STREET].value,
        streetNumber: controls[NaturalPersonInvoiceDetailsFormControlNames.STREET_NUMBER].value,
        apartmentNumber: controls[NaturalPersonInvoiceDetailsFormControlNames.APARTMENT_NUMBER].value,
        city: controls[NaturalPersonInvoiceDetailsFormControlNames.CITY].value,
        postalCode: this.getPostalCode(controls[NaturalPersonInvoiceDetailsFormControlNames.POSTAL_CODE].value),
        countryISO: this.invoiceDetails.address.countryISO,
      },
    };
  }

  private getPostCompanyDetailsModel(): PostCompanyDetails {
    const formGroup = <FormGroup>this.invoiceDetailsForm.controls[COMPANY_FORM_NAME];
    const controls = formGroup.controls;

    return {
      companyName: controls[CompanyInvoiceDetailsFormControlNames.COMPANY_NAME].value,
      vatNumber: controls[CompanyInvoiceDetailsFormControlNames.VAT_NUMBER].value,
      address: {
        street: controls[CompanyInvoiceDetailsFormControlNames.STREET].value,
        streetNumber: controls[CompanyInvoiceDetailsFormControlNames.STREET_NUMBER].value,
        apartmentNumber: controls[CompanyInvoiceDetailsFormControlNames.APARTMENT_NUMBER].value,
        city: controls[CompanyInvoiceDetailsFormControlNames.CITY].value,
        postalCode: this.getPostalCode(controls[CompanyInvoiceDetailsFormControlNames.POSTAL_CODE].value),
        countryISO: this.invoiceDetails.address.countryISO,
      },
      vatRateType: controls[CompanyInvoiceDetailsFormControlNames.VAT_RATE].value,
    };
  }

  private handleUpdateInvoiceDetailsError = (httpError: HttpErrorResponse): Observable<GetInvoiceDetails> => {
    this.loggerService.warn('Error when try to update invoice details, ', httpError);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return EMPTY;
  };

  private getPostalCode(postCodeValue: string): string {
    return `${postCodeValue.slice(0, this.firstPartOfPostalCode)}-${postCodeValue.slice(this.firstPartOfPostalCode)}`;
  }

  private onRequestSuccess(): void {
    this.alertService.pushSuccessAlert('DASHBOARD.PAYMENTS.INVOICE_DETAILS.COMPANY_INVOICE.SAVE_SUCCESS_ALERT');
    this.activeModal.close();
  }

  private getInitialData(): void {
    this.invoiceDetailsService
      .getInvoiceDetails()
      .pipe(
        finalize(() => {
          this.modalAnimationComponentService.stopLoadingAnimation();
        }),
        catchError(err => {
          if (err.status !== httpCodes.notFound) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
            this.loggerService.warn('error when try to get invoice details', err);
            this.activeModal.close();
          }

          return EMPTY;
        }),
      )
      .subscribe(response => {
        this.invoiceDetails = response.invoiceDetails;
        this.isCompanyProfile = response.isCompanyProfile;
        this.invoiceType = response.invoiceDetails.invoiceDetailsType;
      });
  }
}

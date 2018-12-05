import { Component, Input } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, LoggerFactory } from '@anymind-ng/core';
import { CompanyInvoiceDetailsComponentService } from '@platform/features/dashboard/views/user-dashboard/payments/components/invoice-details/components/company-invoice-details/company-invoice-details.component.service';
import { catchError, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Logger } from '@platform/core/logger';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { vatNumberValidator } from './vat-number.validator';
import { GetInvoiceDetails, PostCompanyDetails } from '@anymind-ng/api';

export interface ICompanyInvoiceDetails {
  vatNumber?: string;
  companyName?: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
}

@Component({
  selector: 'plat-company-invoice-details',
  templateUrl: './company-invoice-details.component.html',
  styleUrls: ['./company-invoice-details.component.sass'],
  providers: [CompanyInvoiceDetailsComponentService],
})
export class CompanyInvoiceDetailsComponent extends Logger {
  @Input()
  public set invoiceDetails(value: ICompanyInvoiceDetails | undefined) {
    if (typeof value !== 'undefined') {
      this.assignFormValues(value);
    }
  }

  public readonly vatNumberControlName = 'vatNumber';
  public readonly companyNameControlName = 'companyName';
  public readonly addressControlName = 'address';
  public readonly postalCodeControlName = 'postalCode';
  public readonly cityControlName = 'city';
  public readonly emailControlName = 'email';
  public readonly postalCodePattern = '^[0-9]{5}$';
  public readonly vatNumberValidatorFn: ValidatorFn = vatNumberValidator();
  public companyInvoiceDetailsForm: FormGroup = new FormGroup({});
  public isRequestPending = false;

  private readonly polandIsoCode = 'PL';
  private readonly firstPartOfPostalCode = 2;
  private formControls = this.companyInvoiceDetailsForm.controls;

  constructor(
    private companyInvoiceDetailsService: CompanyInvoiceDetailsComponentService,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private activeModal: NgbActiveModal,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CompanyInvoiceDetailsComponent'));
  }

  public onSubmit = (): void => {
    if (this.companyInvoiceDetailsForm.valid) {
      this.isRequestPending = true;
      this.companyInvoiceDetailsService
        .updateInvoiceDetails(this.getInvoiceDetailsModel())
        .pipe(
          catchError(this.handleUpdateInvoiceDetailsError),
          finalize(() => (this.isRequestPending = false)),
        )
        .subscribe(() => {
          this.alertService.pushSuccessAlert('DASHBOARD.PAYMENTS.INVOICE_DETAILS.COMPANY_INVOICE.SAVE_SUCCESS_ALERT');
          this.activeModal.close();
        });
    } else {
      this.formUtils.validateAllFormFields(this.companyInvoiceDetailsForm);
    }
  };

  private getInvoiceDetailsModel = (): PostCompanyDetails => ({
    // TODO FIX_NEW_FINANCE_MODEL
    vatNumber: this.formControls[this.vatNumberControlName].value,
    companyName: this.formControls[this.companyNameControlName].value,
    address: {
      street: this.formControls[this.addressControlName].value,
      streetNumber: '12',
      postalCode: this.getPostalCode(this.formControls[this.postalCodeControlName].value),
      city: this.formControls[this.cityControlName].value,
      countryISO: this.polandIsoCode,
    },
    vatRateType: 'COMPANY_23',
  });

  private handleUpdateInvoiceDetailsError = (httpError: HttpErrorResponse): Observable<GetInvoiceDetails> => {
    this.loggerService.warn('Error when try to update invoice details, ', httpError);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return of();
  };

  private getPostalCode = (postCodeValue: string): string =>
    `${postCodeValue.slice(0, this.firstPartOfPostalCode)}-${postCodeValue.slice(this.firstPartOfPostalCode)}`;

  private assignFormValues = (value: ICompanyInvoiceDetails): void => {
    this.formControls[this.vatNumberControlName].setValue(value.vatNumber);
    this.formControls[this.companyNameControlName].setValue(value.companyName);
    this.formControls[this.addressControlName].setValue(value.address);
    this.formControls[this.cityControlName].setValue(value.city);
    this.formControls[this.postalCodeControlName].setValue(value.postalCode);
    this.formControls[this.emailControlName].setValue(value.email);
  };
}

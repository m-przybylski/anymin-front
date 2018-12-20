import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '../../../core/logger';
import { GetInvoiceDetails } from '@anymind-ng/api';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { NATURAL_PERSON_FORM_NAME } from './components/natural-person-form/natural-person-form.component';
import { COMPANY_FORM_NAME } from './components/company-form/company-form.component';

@Component({
  selector: 'plat-payout-invoice-details',
  templateUrl: './payout-invoice-details.component.html',
  styleUrls: ['./payout-invoice-details.component.sass'],
})
export class PayoutInvoiceDetailsComponent extends Logger implements OnInit {
  @Input()
  public set invoiceDetails(value: GetInvoiceDetails | undefined) {
    if (typeof value !== 'undefined') {
      this.assignValues(value);
      this._invoiceDetails = value;
    }
  }

  public get invoiceData(): GetInvoiceDetails {
    return this._invoiceDetails;
  }

  @Input()
  public isRequestPending = false;

  @Input()
  public form: FormGroup;

  @Input()
  public isCompanyProfile: boolean;

  @Output()
  public onSelectInvoiceDetailsType = new EventEmitter<GetInvoiceDetails.InvoiceDetailsTypeEnum>();

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  public invoiceDetailsTypeEnum = GetInvoiceDetails.InvoiceDetailsTypeEnum;
  public selectedInvoiceDetailsType: GetInvoiceDetails.InvoiceDetailsTypeEnum;
  public initialStepIndex: number;
  public formHeaderTrKey: string;

  private readonly naturalPersonStepIndex = 0;
  private readonly companyStepIndex = 1;
  private readonly translationKeys = {
    naturalPersonInvoice: 'DASHBOARD.PAYMENTS.INVOICE_MODAL.NATURAL_PERSON_INVOICE.TITLE',
    companyInvoice: 'DASHBOARD.PAYMENTS.INVOICE_MODAL.COMPANY_INVOICE.TITLE',
  };
  private _invoiceDetails: GetInvoiceDetails;

  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('CompanyInvoiceDetailsComponent'));
  }

  public ngOnInit(): void {
    this.form.addControl(NATURAL_PERSON_FORM_NAME, new FormGroup({}));
    this.form.addControl(COMPANY_FORM_NAME, new FormGroup({}));
  }

  public selectCompanySettlementMethod(): void {
    if (!this.isRequestPending) {
      this.selectedInvoiceDetailsType = GetInvoiceDetails.InvoiceDetailsTypeEnum.COMPANY;
      this.onSelectInvoiceDetailsType.emit(GetInvoiceDetails.InvoiceDetailsTypeEnum.COMPANY);
      this.formHeaderTrKey = this.translationKeys.companyInvoice;
      this.stepper.next();
    }
  }

  public selectedNaturalPersonSettlementMethod(): void {
    if (!this.isRequestPending) {
      this.selectedInvoiceDetailsType = GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON;
      this.onSelectInvoiceDetailsType.emit(GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON);
      this.formHeaderTrKey = this.translationKeys.naturalPersonInvoice;
      this.stepper.previous();
    }
  }

  private assignValues(value: GetInvoiceDetails): void {
    this.selectedInvoiceDetailsType = value.invoiceDetailsType;
    if (this.selectedInvoiceDetailsType === GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON) {
      this.initialStepIndex = this.naturalPersonStepIndex;
      this.formHeaderTrKey = this.translationKeys.naturalPersonInvoice;

      return;
    }
    this.initialStepIndex = this.companyStepIndex;
    this.formHeaderTrKey = this.translationKeys.companyInvoice;
  }
}

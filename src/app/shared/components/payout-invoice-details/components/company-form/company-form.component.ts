import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { vatNumberValidator } from './vat-number.validator';
import { GetInvoiceDetails, PostCompanyDetails } from '@anymind-ng/api';
import { Config } from '../../../../../../config';

export const COMPANY_FORM_NAME = 'company';

export enum CompanyInvoiceDetailsFormControlNames {
  COMPANY_NAME = 'firstName',
  STREET = 'street',
  STREET_NUMBER = 'streetNumber',
  APARTMENT_NUMBER = 'apartmentNumber',
  POSTAL_CODE = 'postalCode',
  CITY = 'city',
  VAT_NUMBER = 'vatNumber',
  VAT_RATE = 'vatRate',
  COMPANY_TERMS = 'companyTerms',
}

@Component({
  selector: 'plat-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.sass'],
})
export class CompanyFormComponent implements OnInit, AfterViewInit {
  @Input()
  public isRequestPending = false;

  @Input()
  public form: FormGroup;

  @Input()
  public isCompanyProfile: boolean;

  @Input()
  public set invoiceDetails(value: GetInvoiceDetails | undefined) {
    if (typeof value !== 'undefined') {
      this.assignValues(value);
    }
  }
  public readonly postalCodePattern = Config.patterns.postalCode;
  public readonly vatNumberValidatorFn: ValidatorFn = vatNumberValidator();
  public readonly companyControlNames = CompanyInvoiceDetailsFormControlNames;
  public readonly companyFormName = COMPANY_FORM_NAME;
  public readonly vatRateType = PostCompanyDetails.VatRateTypeEnum;

  public companyForm: FormGroup;
  public isEditForm = false;

  public ngOnInit(): void {
    this.companyForm = <FormGroup>this.form.get(COMPANY_FORM_NAME);
  }

  public ngAfterViewInit(): void {
    this.companyForm.controls[CompanyInvoiceDetailsFormControlNames.VAT_RATE].setValue(
      GetInvoiceDetails.VatRateTypeEnum.COMPANY0,
    );
  }

  private assignValues(invoiceDetails: GetInvoiceDetails): void {
    this.isEditForm = true;
    if (invoiceDetails.invoiceDetailsType === GetInvoiceDetails.InvoiceDetailsTypeEnum.COMPANY) {
      const formControls = this.companyForm.controls;
      formControls[CompanyInvoiceDetailsFormControlNames.COMPANY_NAME].setValue(invoiceDetails.companyName);
      formControls[CompanyInvoiceDetailsFormControlNames.VAT_NUMBER].setValue(invoiceDetails.vatNumber);
      formControls[CompanyInvoiceDetailsFormControlNames.STREET].setValue(invoiceDetails.address.street);
      formControls[CompanyInvoiceDetailsFormControlNames.STREET_NUMBER].setValue(invoiceDetails.address.streetNumber);
      formControls[CompanyInvoiceDetailsFormControlNames.APARTMENT_NUMBER].setValue(
        invoiceDetails.address.apartmentNumber,
      );
      formControls[CompanyInvoiceDetailsFormControlNames.CITY].setValue(invoiceDetails.address.city);
      formControls[CompanyInvoiceDetailsFormControlNames.POSTAL_CODE].setValue(invoiceDetails.address.postalCode);
      formControls[CompanyInvoiceDetailsFormControlNames.VAT_RATE].setValue(invoiceDetails.vatRateType);
    }
  }
}

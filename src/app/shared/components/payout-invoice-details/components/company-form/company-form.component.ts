import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { vatNumberValidator } from './vat-number.validator';
import { GetInvoiceDetails, PostCompanyDetails } from '@anymind-ng/api';
import { Config } from '../../../../../../config';
import { ICountryCodeWithTranslation } from '@platform/shared/models/country-code-with-translation';

export const COMPANY_FORM_NAME = 'companyInvoice';
const COUNTRY_LIST_LENGTH = 7;

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
  COUNTRY = 'country',
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

  @Input()
  public countryList: ReadonlyArray<ICountryCodeWithTranslation>;

  public readonly postalCodePattern = Config.patterns.postalCode;
  public readonly vatNumberValidatorFn: ValidatorFn = vatNumberValidator();
  public readonly companyControlNames = CompanyInvoiceDetailsFormControlNames;
  public readonly companyFormName = COMPANY_FORM_NAME;
  public readonly vatRateType = PostCompanyDetails.VatRateTypeEnum;

  public countryFormGroup = new FormGroup({
    [CompanyInvoiceDetailsFormControlNames.COUNTRY]: new FormControl(),
  });
  public isDropdownVisible = false;
  public countryListDisplay: ReadonlyArray<ICountryCodeWithTranslation>;
  public companyForm: FormGroup;
  public isEditForm = false;

  private countryFormControl: FormControl;

  public ngOnInit(): void {
    this.companyForm = <FormGroup>this.form.get(COMPANY_FORM_NAME);
    this.companyForm.addControl(CompanyInvoiceDetailsFormControlNames.COUNTRY, new FormControl());
    this.countryFormControl = this.countryFormGroup.controls[
      CompanyInvoiceDetailsFormControlNames.COUNTRY
    ] as FormControl;
    this.countryFormControl.valueChanges.subscribe(
      (value: string): void => {
        if (value === '') {
          this.countryListDisplay = [];
          this.isDropdownVisible = false;

          return;
        }
        this.countryListDisplay = this.countryList
          .filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(0, COUNTRY_LIST_LENGTH);
      },
    );
  }

  public onCountrySelected(countryName: ICountryCodeWithTranslation): void {
    this.isDropdownVisible = false;
    this.companyForm.controls[CompanyInvoiceDetailsFormControlNames.COUNTRY].setValue(countryName.code);
    this.countryFormGroup.controls[CompanyInvoiceDetailsFormControlNames.COUNTRY].setValue(countryName.name);
  }

  public showDropdown(): void {
    this.isDropdownVisible = true;
  }

  public ngAfterViewInit(): void {
    this.companyForm.controls[CompanyInvoiceDetailsFormControlNames.VAT_RATE].setValue(
      GetInvoiceDetails.VatRateTypeEnum.COMPANY0,
    );
  }

  private assignValues(invoiceDetails: GetInvoiceDetails): void {
    this.isEditForm = true;
    if (invoiceDetails.invoiceDetailsType === GetInvoiceDetails.InvoiceDetailsTypeEnum.COMPANY) {
      const country = this.countryList.find(ctry => ctry.code === invoiceDetails.address.countryISO);
      this.countryFormGroup.controls[CompanyInvoiceDetailsFormControlNames.COUNTRY].setValue(
        (country && country.name) || '',
      );
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

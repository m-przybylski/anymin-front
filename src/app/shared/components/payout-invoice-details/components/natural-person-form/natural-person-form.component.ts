import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GetInvoiceDetails } from '@anymind-ng/api';
import { Config } from '../../../../../../config';

export const NATURAL_PERSON_FORM_NAME = 'naturalPersonInvoice';

export enum NaturalPersonInvoiceDetailsFormControlNames {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  STREET = 'street',
  STREET_NUMBER = 'streetNumber',
  APARTMENT_NUMBER = 'apartmentNumber',
  POSTAL_CODE = 'postalCode',
  CITY = 'city',
  COUNTRY = 'country',
}

@Component({
  selector: 'plat-natural-person-form',
  templateUrl: './natural-person-form.component.html',
  styleUrls: ['./natural-person-form.component.sass'],
})
export class NaturalPersonFormComponent implements OnInit {
  @Input()
  public isRequestPending = false;

  @Input()
  public form: FormGroup;

  @Input()
  public set invoiceDetails(value: GetInvoiceDetails | undefined) {
    if (typeof value !== 'undefined') {
      this.assignValues(value);
    }
  }

  @Input()
  public countryList: ReadonlyArray<{ name: string; code: string }>;

  public readonly postalCodePattern = Config.patterns.postalCode;
  public readonly formGroupName = NATURAL_PERSON_FORM_NAME;
  public readonly naturalPersonControlNames = NaturalPersonInvoiceDetailsFormControlNames;
  public countryFormGroup = new FormGroup({
    [NaturalPersonInvoiceDetailsFormControlNames.COUNTRY]: new FormControl(),
  });

  public naturalPersonForm: FormGroup;
  public isDropdownVisible = false;
  public countryListDisplay: ReadonlyArray<{ name: string; code: string }>;
  private countryFormControl: FormControl;

  public ngOnInit(): void {
    this.naturalPersonForm = <FormGroup>this.form.get(NATURAL_PERSON_FORM_NAME);
    this.naturalPersonForm.addControl(NaturalPersonInvoiceDetailsFormControlNames.COUNTRY, new FormControl());
    this.countryFormControl = this.countryFormGroup.controls[
      NaturalPersonInvoiceDetailsFormControlNames.COUNTRY
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
          .slice(0, parseInt('7', 10));
      },
    );
  }

  public onCountrySelected(countryName: { name: string; code: string }): void {
    this.isDropdownVisible = false;
    this.naturalPersonForm.controls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY].setValue(countryName.code);
    this.countryFormGroup.controls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY].setValue(countryName.name);
  }

  public showDropdown(): void {
    this.isDropdownVisible = true;
  }

  private assignValues(invoiceDetails: GetInvoiceDetails): void {
    if (invoiceDetails.invoiceDetailsType === GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON) {
      const country = this.countryList.find(ctry => ctry.code === invoiceDetails.address.countryISO);
      this.countryFormGroup.controls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY].setValue(
        (country && country.name) || '',
      );
      const formControls = this.naturalPersonForm.controls;
      formControls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY].setValue(invoiceDetails.address.countryISO);
      formControls[NaturalPersonInvoiceDetailsFormControlNames.FIRST_NAME].setValue(invoiceDetails.firstName);
      formControls[NaturalPersonInvoiceDetailsFormControlNames.LAST_NAME].setValue(invoiceDetails.lastName);
      formControls[NaturalPersonInvoiceDetailsFormControlNames.STREET].setValue(invoiceDetails.address.street);
      formControls[NaturalPersonInvoiceDetailsFormControlNames.STREET_NUMBER].setValue(
        invoiceDetails.address.streetNumber,
      );
      formControls[NaturalPersonInvoiceDetailsFormControlNames.APARTMENT_NUMBER].setValue(
        invoiceDetails.address.apartmentNumber,
      );
      formControls[NaturalPersonInvoiceDetailsFormControlNames.CITY].setValue(invoiceDetails.address.city);
      formControls[NaturalPersonInvoiceDetailsFormControlNames.POSTAL_CODE].setValue(invoiceDetails.address.postalCode);
    }
  }
}

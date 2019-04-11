import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { GetInvoiceDetails } from '@anymind-ng/api';
import { Config } from '../../../../../../config';
import { ICountryCodeWithTranslation } from '@platform/shared/models/country-code-with-translation';

export const NATURAL_PERSON_FORM_NAME = 'naturalPersonInvoice';
const COUNTRY_LIST_LENGTH = 7;

export enum NaturalPersonInvoiceDetailsFormControlNames {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  STREET = 'street',
  STREET_NUMBER = 'streetNumber',
  APARTMENT_NUMBER = 'apartmentNumber',
  POSTAL_CODE = 'postalCode',
  CITY = 'city',
  COUNTRY = 'country',
  COUNTRY_NAME = 'countryName',
}

@Component({
  selector: 'plat-natural-person-form',
  templateUrl: './natural-person-form.component.html',
  styleUrls: ['./natural-person-form.component.sass'],
})
export class NaturalPersonFormComponent implements OnInit, AfterViewInit {
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
  public countryList: ReadonlyArray<ICountryCodeWithTranslation>;

  public readonly postalCodePattern = Config.patterns.postalCode;
  public readonly formGroupName = NATURAL_PERSON_FORM_NAME;
  public readonly naturalPersonControlNames = NaturalPersonInvoiceDetailsFormControlNames;

  public naturalPersonForm: FormGroup;
  public isDropdownVisible = false;
  public countryListDisplay: ReadonlyArray<ICountryCodeWithTranslation> = [];
  private countryFormControl: FormControl;

  public ngOnInit(): void {
    this.naturalPersonForm = <FormGroup>this.form.get(NATURAL_PERSON_FORM_NAME);
    this.naturalPersonForm.addControl(
      NaturalPersonInvoiceDetailsFormControlNames.COUNTRY,
      new FormControl('', Validators.required),
    );
  }

  public ngAfterViewInit(): void {
    this.countryFormControl = this.naturalPersonForm.controls[
      NaturalPersonInvoiceDetailsFormControlNames.COUNTRY_NAME
    ] as FormControl;

    const validator: ValidatorFn = (): ValidationErrors | null => {
      if (!!this.naturalPersonForm.controls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY].value) {
        // tslint:disable-next-line: no-null-keyword
        return null;
      }

      return { 'Country not found': true };
    };
    this.countryFormControl.setValidators([validator, Validators.required]);

    this.countryFormControl.valueChanges.subscribe(
      (value: string): void => {
        this.naturalPersonForm.controls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY].setValue('');
        if (value && value.length < 1) {
          this.countryListDisplay = [];
          this.isDropdownVisible = false;

          return;
        }
        this.countryListDisplay = this.getCountryListDisplay(value);

        this.showDropdown();
      },
    );
  }

  public onCountrySelected(countryName: ICountryCodeWithTranslation): void {
    this.isDropdownVisible = false;
    this.naturalPersonForm.controls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY].setValue(countryName.code);
    this.naturalPersonForm.controls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY_NAME].setValue(
      countryName.name,
      {
        emitEvent: false,
      },
    );
  }

  public showDropdown(): void {
    this.isDropdownVisible = this.countryListDisplay.length > 0;
  }

  private assignValues(invoiceDetails: GetInvoiceDetails): void {
    if (invoiceDetails.invoiceDetailsType === GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON) {
      const country = this.countryList.find(ctry => ctry.code === invoiceDetails.address.countryISO);
      const countryName = (country && country.name) || '';
      this.countryListDisplay = this.getCountryListDisplay(countryName);
      const formControls = this.naturalPersonForm.controls;
      formControls[NaturalPersonInvoiceDetailsFormControlNames.COUNTRY_NAME].setValue(countryName, {
        emitEvent: false,
      });
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

  private getCountryListDisplay(value: string): ReadonlyArray<ICountryCodeWithTranslation> {
    return this.countryList
      .filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, COUNTRY_LIST_LENGTH);
  }
}

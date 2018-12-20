import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GetInvoiceDetails } from '@anymind-ng/api';
import { Config } from '../../../../../../config';

export const NATURAL_PERSON_FORM_NAME = 'naturalPerson';

export enum NaturalPersonInvoiceDetailsFormControlNames {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  STREET = 'street',
  STREET_NUMBER = 'streetNumber',
  APARTMENT_NUMBER = 'apartmentNumber',
  POSTAL_CODE = 'postalCode',
  CITY = 'city',
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

  public readonly postalCodePattern = Config.patterns.postalCode;
  public readonly formGroupName = NATURAL_PERSON_FORM_NAME;
  public readonly naturalPersonControlNames = NaturalPersonInvoiceDetailsFormControlNames;

  public naturalPersonForm: FormGroup;

  public ngOnInit(): void {
    this.naturalPersonForm = <FormGroup>this.form.get(NATURAL_PERSON_FORM_NAME);
  }

  private assignValues(invoiceDetails: GetInvoiceDetails): void {
    if (invoiceDetails.invoiceDetailsType === GetInvoiceDetails.InvoiceDetailsTypeEnum.NATURALPERSON) {
      const formControls = this.naturalPersonForm.controls;
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

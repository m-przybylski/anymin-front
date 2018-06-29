import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsultationPriceComponentService } from './consultation-price.component.service';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';
import { CommonConfig } from '../../../../common-config';
import { Config } from '../../../../config';

@Component({
  selector: 'plat-consultation-price',
  templateUrl: './consultation-price.component.html',
  styleUrls: ['./consultation-price.component.sass'],
  providers: [ConsultationPriceComponentService]
})
export class ConsultationPriceComponent implements OnInit {

  @Input()
  public labelWithoutCommission: string;

  @Input()
  public labelGross: string;

  @Input()
  public withoutCommissionControlName: string;

  @Input()
  public grossControlName: string;

  @Input()
  public netControlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public isRequired ? = false;

  @Input()
  public isDisabled ? = false;

  @Input()
  public taxValue: number = Config.polishVatTax;

  @Input()
  public anyMindCommission = Config.anyMindCommissions.expert;

  public minValidPriceWithoutCommission: number;
  public maxValidPriceWithoutCommission: number;
  public grossMinValidPrice: number;
  public grossMaxValidPrice: number;

  private readonly commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  private readonly lastButOneIndex = 2;
  private moneyDivider: number;

  constructor(private consultationPriceComponentService: ConsultationPriceComponentService) {
  }

  public ngOnInit(): void {
    this.form.addControl(this.netControlName, new FormControl());
    this.minValidPriceWithoutCommission = this.commonConfig.validation.consultation['price-min'];
    this.maxValidPriceWithoutCommission = this.consultationPriceComponentService
      .getMaxValidPriceWithoutCommission(this.anyMindCommission, this.taxValue);
    this.grossMinValidPrice = this.consultationPriceComponentService
      .getMinGrossValidPrice(this.anyMindCommission, this.taxValue);
    this.grossMaxValidPrice = this.commonConfig.validation.consultation['price-max'];
    this.moneyDivider = this.commonConfig.config.moneyDivider;
  }

  public calculateGrossPrice = (inputValue: number): void => {
    if (this.isFormControlValid(this.withoutCommissionControlName)) {
      const grossPrice = this.consultationPriceComponentService
        .getGrossPrice(inputValue, this.anyMindCommission, this.taxValue);
      this.form.controls[this.grossControlName].setValue(this.createInputPriceModel(grossPrice));
      this.form.controls[this.netControlName].setValue(
        this.consultationPriceComponentService.getNetPrice(inputValue, this.anyMindCommission));
    } else {
      this.displayFormControlError(this.withoutCommissionControlName);
      this.form.controls[this.grossControlName].setValue('');
      this.form.controls[this.netControlName].setValue('');
    }
  }

  public calculatePriceWithoutCommission = (inputValue: number): void => {
    if (this.isFormControlValid(this.grossControlName)) {
      const priceWithoutCommission = this.consultationPriceComponentService
        .getPriceWithoutCommission(inputValue, this.anyMindCommission, this.taxValue);
      this.form.controls[this.withoutCommissionControlName]
        .setValue(this.createInputPriceModel(priceWithoutCommission));
      const netPrice = this.consultationPriceComponentService
        .getNetPrice(priceWithoutCommission, this.anyMindCommission);
      this.form.controls[this.netControlName].setValue(netPrice);
    } else {
      this.displayFormControlError(this.grossControlName);
      this.form.controls[this.withoutCommissionControlName].setValue('');
      this.form.controls[this.netControlName].setValue('');
    }
  }

  private createInputPriceModel = (value: number): string => {
    const stringVal = value.toString().replace('.', ',');
    if (stringVal.indexOf(',') === stringVal.length - 1 || stringVal.indexOf(',') === -1) {
      return `${stringVal},00`;
    } else if (stringVal.indexOf(',') === stringVal.length - this.lastButOneIndex) {
     return `${stringVal}0`;
    }

    return stringVal;
  }

  private isFormControlValid = (controlName: string): boolean =>
    this.form.controls[controlName].valid

  private displayFormControlError = (controlName: string): void => {
    this.form.controls[controlName].markAsTouched();
  }

}

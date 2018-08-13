import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';
import { CommonConfig } from '../../../../common-config';
import { DefaultConsultationPriceService } from './consulatation-price-services/default-consultation-price.service';
import { FreelanceConsultationPriceService } from './consulatation-price-services/freelance-consultation-price.service';
import {
  IConsultationPriceComponentService
}
  from './consulatation-price-services/consultation-price-component-service.interface';

@Component({
  selector: 'plat-consultation-price',
  templateUrl: './consultation-price.component.html',
  styleUrls: ['./consultation-price.component.sass']
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
  public nettControlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public isRequired ? = false;

  @Input()
  public isDisabled ? = false;

  @Input()
  public taxValue: number;

  @Input()
  public commission: number;

  @Input()
  public set isFreelanceService(isFreelance: boolean) {
    if (isFreelance) {
      this.consultationPriceComponentService = new FreelanceConsultationPriceService(this.taxValue, this.commission);
      this.assignValidationValues();
    } else {
      this.consultationPriceComponentService = new DefaultConsultationPriceService(this.taxValue, this.commission);
      this.assignValidationValues();
    }
  }

  public minValidPriceWithoutCommission: number;
  public maxValidPriceWithoutCommission: number;
  public grossMinValidPrice: number;
  public grossMaxValidPrice: number;

  private readonly commonConfig: ConfigDEFAULT = CommonConfig.getCommonConfig();
  private readonly lastButOneIndex = 2;
  private consultationPriceComponentService: IConsultationPriceComponentService;

  constructor() {
    this.taxValue = this.commonConfig.config.taxes.vat.pl;
    this.commission = this.commonConfig.config.commissions.default.internal;

  }

  public ngOnInit(): void {
    this.form.addControl(this.nettControlName, new FormControl());
  }

  public calculateGrossPrice = (inputValue: number): void => {
    if (this.isFormControlValid(this.withoutCommissionControlName)) {
      const grossPrice = this.consultationPriceComponentService.getGrossPrice(inputValue);
      this.form.controls[this.grossControlName].setValue(this.createInputPriceModel(grossPrice));
      this.form.controls[this.nettControlName]
        .setValue(this.consultationPriceComponentService.getNettPrice(inputValue));
    } else {
      this.displayFormControlError(this.withoutCommissionControlName);
      this.form.controls[this.grossControlName].setValue('');
      this.form.controls[this.nettControlName].setValue('');
    }
  }

  public calculatePriceWithoutCommission = (inputValue: number): void => {
    if (this.isFormControlValid(this.grossControlName)) {
      const priceWithoutCommission = this.consultationPriceComponentService.getPriceWithoutCommission(inputValue);
      this.form.controls[this.withoutCommissionControlName]
        .setValue(this.createInputPriceModel(priceWithoutCommission));
      const netPrice = this.consultationPriceComponentService.getNettPrice(priceWithoutCommission);
      this.form.controls[this.nettControlName].setValue(netPrice);
    } else {
      this.displayFormControlError(this.grossControlName);
      this.form.controls[this.withoutCommissionControlName].setValue('');
      this.form.controls[this.nettControlName].setValue('');
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

  private assignValidationValues = (): void => {
    this.minValidPriceWithoutCommission = this.consultationPriceComponentService.getMinValidPriceWithoutCommission();
    this.maxValidPriceWithoutCommission = this.consultationPriceComponentService.getMaxValidPriceWithoutCommission();
    this.grossMinValidPrice = this.consultationPriceComponentService.getMinGrossValidPrice();
    this.grossMaxValidPrice = this.commonConfig.validation.consultation['price-max'];
  }

}

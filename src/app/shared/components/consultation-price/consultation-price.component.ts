import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DefaultConsultationPriceService } from './consulatation-price-services/default-consultation-price.service';
import { FreelanceConsultationPriceService } from './consulatation-price-services/freelance-consultation-price.service';
import { IConsultationPriceComponentService } from './consulatation-price-services/consultation-price-component-service.interface';

@Component({
  selector: 'plat-consultation-price',
  templateUrl: './consultation-price.component.html',
  styleUrls: ['./consultation-price.component.sass'],
})
export class ConsultationPriceComponent implements OnInit {
  @Input()
  public labelWithoutCommission: string;

  @Input()
  public withoutCommissionControlName: string;

  @Input()
  public nettControlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public isRequired = false;

  @Input()
  public isDisabled = false;

  @Input()
  public taxValue = 0.23;

  @Input()
  public commission = 0;

  @Input()
  public set isFreelanceService(isFreelance: boolean) {
    this._isFreelanceService = isFreelance;
    if (isFreelance) {
      this.consultationPriceComponentService = new FreelanceConsultationPriceService(this.taxValue, this.commission);
      this.assignValidationValues();
    } else {
      this.consultationPriceComponentService = new DefaultConsultationPriceService(this.taxValue, this.commission);
      this.assignValidationValues();
    }
  }

  @Input()
  public set nettPrice(value: number | undefined) {
    if (typeof value !== 'undefined') {
      setTimeout(() => {
        this.calculatePriceWithoutCommission(value);
      });
    }
  }

  public minValidPriceWithoutCommission: number;
  public maxValidPriceWithoutCommission: number;
  public _isFreelanceService: boolean;

  private readonly lastButOneIndex = 2;
  private consultationPriceComponentService: IConsultationPriceComponentService;

  public ngOnInit(): void {
    this.form.addControl(this.nettControlName, new FormControl());
  }

  public calculateGrossPrice = (inputValue: number): void => {
    if (this.isFormControlValid(this.withoutCommissionControlName)) {
      this.form.controls[this.nettControlName].setValue(
        this.consultationPriceComponentService.getNettPrice(inputValue),
      );
    } else {
      this.displayFormControlError(this.withoutCommissionControlName);
      this.form.controls[this.nettControlName].setValue('');
    }
  };

  public calculatePriceWithoutCommission = (inputValue: number): void => {
    if (this._isFreelanceService && this.isFormControlValid(this.nettControlName)) {
      const priceWithoutCommission = this.consultationPriceComponentService.getPriceWithoutCommission(inputValue);
      this.form.controls[this.withoutCommissionControlName].setValue(
        this.createInputPriceModel(priceWithoutCommission),
      );

      return;
    }

    if (!this._isFreelanceService && this.isFormControlValid(this.nettControlName)) {
      this.form.controls[this.withoutCommissionControlName].setValue(this.createInputPriceModel(inputValue));

      return;
    }
  };

  private createInputPriceModel = (value: number): string => {
    const stringVal = value.toString().replace('.', ',');
    if (stringVal.indexOf(',') === stringVal.length - 1 || stringVal.indexOf(',') === -1) {
      return `${stringVal},00`;
    } else if (stringVal.indexOf(',') === stringVal.length - this.lastButOneIndex) {
      return `${stringVal}0`;
    }

    return stringVal;
  };

  private isFormControlValid = (controlName: string): boolean => this.form.controls[controlName].valid;

  private displayFormControlError = (controlName: string): void => {
    this.form.controls[controlName].markAsTouched();
  };

  private assignValidationValues = (): void => {
    this.minValidPriceWithoutCommission = this.consultationPriceComponentService.getMinValidPriceWithoutCommission();
    this.maxValidPriceWithoutCommission = this.consultationPriceComponentService.getMaxValidPriceWithoutCommission();
  };
}

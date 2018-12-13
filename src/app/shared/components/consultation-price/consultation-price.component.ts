import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConsultationPriceComponentService } from './consultation-price.component.service';
import { Config } from '../../../../config';

@Component({
  selector: 'plat-consultation-price',
  templateUrl: './consultation-price.component.html',
  styleUrls: ['./consultation-price.component.sass'],
  providers: [ConsultationPriceComponentService],
})
export class ConsultationPriceComponent implements AfterViewInit {
  @Input()
  public priceControlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public isDisabled = false;

  @Input()
  public isCompanyService = false;

  @Input()
  public set isFreelanceService(isFreelance: boolean) {
    this._isFreelanceService = isFreelance;
    this.anyMindCommissionForUI = this.consultationPriceComponentService.getAnyMindCommission(isFreelance);
    if (this.isFormControlValue()) {
      /**
       * Value of priceControl is string
       * so we have to convert it to number
       */
      this.onInputPriceChange(Number(this.form.controls[this.priceControlName].value.replace(',', '.')));
    }
  }

  public get isFreelanceService(): boolean {
    return this._isFreelanceService;
  }

  @Input()
  public set consultationPrice(value: number | undefined) {
    if (typeof value !== 'undefined') {
      const price = value / Config.moneyDivider;
      this.form.controls[this.priceControlName].setValue(
        this.consultationPriceComponentService.createInputPriceModel(price),
      );
      this.onInputPriceChange(price);
    }
  }

  public readonly minValidPrice = Config.consultationPriceValidationValues.min;
  public readonly maxValidPrice = Config.consultationPriceValidationValues.max;
  public priceAfterAnyMindCommission: string;
  public anyMindCommissionForUI: string;
  public freelancerProfit: string;

  private _isFreelanceService: boolean;

  constructor(private consultationPriceComponentService: ConsultationPriceComponentService) {}

  public ngAfterViewInit(): void {
    if (this.isFormControlValue()) {
      this.onInputPriceChange(Number(this.form.controls[this.priceControlName].value.replace(',', '.')));
    }
  }

  public onInputPriceChange = (inputValue: number): void => {
    this.priceAfterAnyMindCommission = this.consultationPriceComponentService.getPriceAfterAnyMindCommission(
      inputValue,
      this.isFreelanceService,
    );

    if (this.isFreelanceService) {
      this.freelancerProfit = this.consultationPriceComponentService.getFreelancerProfit(inputValue);
    }
  };

  private isFormControlValue(): boolean {
    return this.form.contains(this.priceControlName) && this.form.controls[this.priceControlName].value !== null;
  }
}

import { NgModule } from '@angular/core';
import { InputSwitchComponent } from './input-switch/input-switch.component';
import { InputAddItemComponent } from './input-add-item/input-add-item.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { InputNumericComponent } from '@platform/shared/components/inputs/custom-input-numeric/custom-input-numeric.component';
import { TooltipModule } from '@platform/shared/components/tooltip/tooltip.module';
import { SelectPaymentMethodCardRadioComponent } from '@platform/shared/components/modals/payments/select-payment-method-card-radio/select-payment-method-card-radio.component';
import { NgxMaskModule } from 'ngx-mask';
import { SelectPromoCodeRadioComponent } from '@platform/shared/components/modals/payments/select-promo-code-radio/select-promo-code-radio.component';
import { MoneyDisplayModule } from '@platform/shared/components/money-display/money-display.module';
import { DropdownModule } from '@platform/shared/components/dropdown/dropdown.module';

@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    AnymindComponentsModule,
    TranslateModule,
    ButtonModule,
    IconModule,
    TooltipModule,
    MoneyDisplayModule,
  ],
  exports: [
    InputSwitchComponent,
    InputAddItemComponent,
    InputNumericComponent,
    SelectPaymentMethodCardRadioComponent,
    SelectPromoCodeRadioComponent,
  ],
  declarations: [
    InputSwitchComponent,
    InputAddItemComponent,
    InputNumericComponent,
    SelectPaymentMethodCardRadioComponent,
    SelectPromoCodeRadioComponent,
  ],
  providers: [],
})
export class InputsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentsViewComponent } from '@platform/features/dashboard/views/user-dashboard/payments/payments.view.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@platform/shared/shared.module';
import { PayoutMethodComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/payout-method.component';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { BankAccountComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/components/bank-account/bank-account.component';
import { PayPalAccountComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/components/paypal-account/paypal-account.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { PayoutInvoiceDetailsModule } from '@platform/shared/components/payout-invoice-details/payout-invoice-details.module';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { MoneyDisplayModule } from '@platform/shared/components/money-display/money-display.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ContentLoaderModule } from '@platform/shared/components/content-loader/content-loader.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ModalsModule,
    RouterModule.forChild([{ path: '', component: PaymentsViewComponent }]),
    StoreModule.forFeature('payments', reducers),
    TranslateModule,
    ButtonModule,
    IconModule,
    PayoutInvoiceDetailsModule,
    AnymindComponentsModule,
    InputsModule,
    MoneyDisplayModule,
    ContentLoaderModule,
  ],
  exports: [],
  declarations: [
    PaymentsViewComponent,
    PayoutMethodComponent,
    BankAccountComponent,
    PayPalAccountComponent,
    InvoiceDetailsComponent,
  ],
  entryComponents: [PayoutMethodComponent, InvoiceDetailsComponent],
})
export class PaymentsModule {}

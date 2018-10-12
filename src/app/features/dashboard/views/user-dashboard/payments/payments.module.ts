import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentsViewComponent } from '@platform/features/dashboard/views/user-dashboard/payments/payments.view.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@platform/shared/shared.module';
import { PayoutMethodComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/payout-method.component';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { BankAccountComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/components/bank-account/bank-account.component';
import { PaymentsResolver } from '@platform/features/dashboard/views/user-dashboard/payments/payments.resolver';
import { PayPalAccountComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/components/paypal-account/paypal-account.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ModalsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PaymentsViewComponent,
        resolve: { getPayoutMethod: PaymentsResolver },
        runGuardsAndResolvers: 'always',
      },
    ]),
    TranslateModule,
  ],
  exports: [],
  providers: [PaymentsResolver],
  declarations: [PaymentsViewComponent, PayoutMethodComponent, BankAccountComponent, PayPalAccountComponent],
  entryComponents: [PayoutMethodComponent],
})
export class PaymentsModule {}

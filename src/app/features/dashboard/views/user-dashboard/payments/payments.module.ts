import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentsViewComponent } from '@platform/features/dashboard/views/user-dashboard/payments/payments.view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PaymentsViewComponent,
      },
    ]),
  ],
  exports: [],
  providers: [],
  declarations: [PaymentsViewComponent],
})
export class PaymentsModule {}

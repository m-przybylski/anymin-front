import { PayoutInvoiceDetailsComponent } from './payout-invoice-details.component';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { NaturalPersonFormComponent } from './components/natural-person-form/natural-person-form.component';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';

@NgModule({
  imports: [CommonModule, TranslateModule, AnymindComponentsModule, ReactiveFormsModule, StepperModule],
  exports: [PayoutInvoiceDetailsComponent],
  declarations: [PayoutInvoiceDetailsComponent, CompanyFormComponent, NaturalPersonFormComponent],
})
export class PayoutInvoiceDetailsModule {}

import { NgModule } from '@angular/core';
// import { ConsultationFooterModule } from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer.module';
// import { ConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/consultation-details.view.module';
import { FootersPageComponent } from './containers/footers-page';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: 'footers', component: FootersPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    // ConsultationFooterModule,
    // ConsultationDetailsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [FootersPageComponent],
})
export class ConultationFooterTestingModule {}

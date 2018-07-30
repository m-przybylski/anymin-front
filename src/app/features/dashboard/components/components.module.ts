import { SocialLinksComponent } from './social-links.ts/social-links';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ConsultationRowComponent } from './consultation-row/consultation-row.component';
import { ConsultationStatComponent } from './consultation-stat/consultation-stat.component';
import { AnymindComponentsModule } from '@anymind-ng/core';
const COMPONENTS = [SocialLinksComponent, ConsultationRowComponent, ConsultationStatComponent];
@NgModule({
  imports: [CommonModule, SharedModule, AnymindComponentsModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class DashboardComponentsModule {}

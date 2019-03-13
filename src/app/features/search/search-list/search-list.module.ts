import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchConsultationItemComponent } from './search-consultation-item/search-consultation-item.component';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { TranslateModule } from '@ngx-translate/core';
import { MoneyDisplayModule } from '@platform/shared/components/money-display/money-display.module';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';

@NgModule({
  declarations: [SearchConsultationItemComponent],
  imports: [
    CommonModule,
    UserAvatarModule,
    ButtonModule,
    IconModule,
    TranslateModule,
    MoneyDisplayModule,
    DashboardComponentsModule,
    ExpertAvailabilityModule,
  ],
  exports: [SearchConsultationItemComponent, MoneyDisplayModule, ButtonModule, IconModule],
})
export class SearchListModule {}

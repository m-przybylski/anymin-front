import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { ConsultationDetailsComponent } from '@platform/features/dashboard/components/consultation-details/consultation-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@platform/shared/shared.module';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, UserAvatarModule, ExpertAvailabilityModule],
  declarations: [ConsultationDetailsComponent],
  exports: [UserAvatarModule, ConsultationDetailsComponent],
})
export class ConsultationDetailsComponentModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { ConsultationDetailsComponent } from '@platform/features/dashboard/components/consultation-details/consultation-details.component';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@platform/shared/shared.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, UserAvatarModule],
  declarations: [ConsultationDetailsComponent],
  exports: [UserAvatarModule, ConsultationDetailsComponent],
  providers: [ExpertAvailabilityService],
})
export class ConsultationDetailsComponentModule {}

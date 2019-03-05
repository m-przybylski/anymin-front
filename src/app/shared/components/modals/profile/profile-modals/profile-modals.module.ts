import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { VerifiedEmailModule } from '@platform/shared/components/modals/verfied-email/verified-email.module';
import { ProfileModalsService } from '@platform/shared/components/modals/profile/profile-modals/profile-modals.service';

@NgModule({
  imports: [CommonModule, ModalsModule, VerifiedEmailModule],
  providers: [ProfileModalsService],
})
export class ManageProfileModalsModule {}

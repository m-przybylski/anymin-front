import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationsListItemComponent } from './invitations-list-item/invitations-list-item.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';

@NgModule({
  imports: [CommonModule, SharedModule, UserAvatarModule],
  declarations: [InvitationsListItemComponent],
  exports: [InvitationsListItemComponent],
})
export class InvitationsComponentsModule {}

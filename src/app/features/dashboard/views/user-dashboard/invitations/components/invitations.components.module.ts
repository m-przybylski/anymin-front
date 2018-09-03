import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationsListItemComponent } from './invitations-list-item/invitations-list-item.component';
import { SharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [InvitationsListItemComponent],
  exports: [InvitationsListItemComponent],
})
export class InvitationsComponentsModule {}

import { NgModule } from '@angular/core';
import { InvitationsListComponent } from './views/invitations-list/invitations-list.component';
import { InvitationsComponentsModule } from './components/invitations.components.module';
import { InvitationsRoutingModule } from './invitations.routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InvitationListResolverService } from './services/invitation-list.resolver.service';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { InvitationsModalsModule } from '@platform/shared/components/modals/invitations/invitations.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    InvitationsComponentsModule,
    InvitationsModalsModule,
    InvitationsRoutingModule,
    AnymindComponentsModule,
  ],
  exports: [],
  providers: [InvitationListResolverService],
  declarations: [InvitationsListComponent],
})
export class InvitationsModule {}

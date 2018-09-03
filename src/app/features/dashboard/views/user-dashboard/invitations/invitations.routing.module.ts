import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationsListComponent } from './views/invitations-list/invitations-list.component';
import { InvitationListResolverService } from './services/invitation-list.resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: InvitationsListComponent,
    resolve: { data: InvitationListResolverService },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationsRoutingModule {}

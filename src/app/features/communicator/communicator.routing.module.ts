import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicatorComponent } from './communicator.component';
import { CommunicatorGuard } from './communicator.guard';
import { CommunicatorDeactivateGuardService } from '@platform/features/communicator/communicator-deactive.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/expert/activities',
    pathMatch: 'full',
  },
  {
    path: ':callId',
    component: CommunicatorComponent,
    canActivate: [CommunicatorGuard],
    canDeactivate: [CommunicatorDeactivateGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CommunicatorDeactivateGuardService],
})
export class CommunicatorRoutingModule {}

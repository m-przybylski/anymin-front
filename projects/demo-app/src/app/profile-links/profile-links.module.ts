import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileLinkTestingComponent } from './containers/profile-links.component';
import { ProfileModalModule } from '@platform/shared/components/modals/profile/profile.module';
const routes: Routes = [
  {
    path: 'profile-link',
    component: ProfileLinkTestingComponent,
  },
];
@NgModule({
  imports: [ProfileModalModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [ProfileLinkTestingComponent],
})
export class ProfileLinksTestingModule {}

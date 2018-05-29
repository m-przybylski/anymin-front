import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './views/discover/discover.component';
import { CompanyActivitiesComponent } from './views/company-activities/company-activities.component';

const routes: Routes = [
  { path: 'discover', component: DiscoverComponent },
  { path: 'company-activities', component: CompanyActivitiesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}

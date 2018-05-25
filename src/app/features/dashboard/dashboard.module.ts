import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  providers: [
  ],
  imports: [
    SharedModule,
    AngularJsProvidersModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {

  constructor() {
  }
}

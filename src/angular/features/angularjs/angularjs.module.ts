import {NgModule} from '@angular/core';
import {AngularJsProvidersModule} from '../../upgrade/angularjs-providers.module';
import {AngularJsComponent} from './angularjs.component';
import {AngularJsRoutingModule} from './angularjs.routing.module';

@NgModule({
  declarations: [
    AngularJsComponent
  ],
  imports: [
    AngularJsProvidersModule,
    AngularJsRoutingModule
  ]
})
export class AngularJsModule {
  constructor() {
  }
}

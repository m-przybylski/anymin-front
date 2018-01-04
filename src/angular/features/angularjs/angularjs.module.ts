import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UpgradeModule} from '@angular/upgrade/static';
import {setUpLocationSync} from '@angular/router/upgrade';
import {AngularJSComponent} from './angularjs.component';
import {angularjsModule} from '../../../angularjs/app/app.module';

@NgModule({
  declarations: [
    AngularJSComponent
  ],
  imports: [
    UpgradeModule,
    RouterModule.forChild([
      {path: '**', component: AngularJSComponent}
    ])
  ]
})
export class AngularJSModule {
  // The constructor is called only once, so we bootstrap the application
  // only once, when we first navigate to the legacy part of the app.
  constructor(upgrade: UpgradeModule) {
    upgrade.bootstrap(document.body, [angularjsModule.name]);
    setUpLocationSync(upgrade);
  }
}

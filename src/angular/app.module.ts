import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { XSRFStrategy } from '@angular/http';
import { AppComponent } from './app.component';
import { BASE_PATH } from 'profitelo-api-ng4/variables';
import { CommonConfig } from '../../generated_modules/common-config/common-config';
import { XSRFStrategyProvider } from './shared/providers/xsrf-strategy/xsrf-strategy.provider';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { RouterModule } from '@angular/router';
import { AngularJsBootstrapSingletonService } from './upgrade/angularjs-bootstrap-singleton.service';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpInterceptorModule,
    CoreModule,
    SharedModule,
    UpgradeModule
  ],
  providers: [
    AngularJsBootstrapSingletonService,
    { provide: XSRFStrategy, useValue: new XSRFStrategyProvider() },
    { provide: BASE_PATH, useValue: CommonConfig.settings.urls.backend }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {}
}

// tslint:disable:no-empty
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { AngularJsBootstrapSingletonService } from './upgrade/angularjs-bootstrap-singleton.service';
import { UpgradeModule } from '@angular/upgrade/static';
import { RavenErrorHandler } from './shared/providers/raven-error-handler/raven-error-handler';
import { ConfirmEmailModule } from './features/confirm-email/confirm-email.module';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ConfirmEmailModule,
    UpgradeModule,
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      maxAge: 50,
      logOnly: environment.production,
    }),
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
  ],
  providers: [{ provide: ErrorHandler, useClass: RavenErrorHandler }, AngularJsBootstrapSingletonService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}

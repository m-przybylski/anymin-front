import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { setAngularJSGlobal } from '@angular/upgrade/static';
import * as angular from 'angular';

if (environment.production) {
  enableProdMode();
}

setAngularJSGlobal(angular);

// tslint:disable:no-console
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

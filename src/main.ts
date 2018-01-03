import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './angular/app.module';
import { environment } from './environments/environment';
import {setAngularLib} from '@angular/upgrade/static';
import * as angular from 'angular';

if (environment.production) {
  enableProdMode();
}
setAngularLib(angular);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

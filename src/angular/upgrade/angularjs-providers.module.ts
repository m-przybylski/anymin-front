import {NgModule} from '@angular/core';
import {
  AngularJsBootstrapSingletonService
} from './angularjs-bootstrap-singleton.service';

// This module should be imported only where you need AngularJS $injector
// It will take care of AngularJS bootstrap procedure, to do it only once
@NgModule({})
export class AngularJsProvidersModule {

  constructor(angularJsBootstrapSingletonService: AngularJsBootstrapSingletonService) {
    angularJsBootstrapSingletonService.getInstance()
  }
}

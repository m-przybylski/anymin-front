// tslint:disable:strict-boolean-expressions
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { setUpLocationSync } from '@angular/router/upgrade';
import { angularjsModule } from '../../angularjs/app/app.module';
import * as angular from 'angular';

@Injectable()
export class AngularJsBootstrapSingletonService {

  private angularjsRootModule?: angular.IModule;

  constructor(private upgrade: UpgradeModule) {
  }

  public getInstance = (): angular.IModule => {
    if (this.angularjsRootModule) {
      return this.angularjsRootModule;
    }
    else {
      this.upgrade.bootstrap(document.body, [angularjsModule.name], {strictDi: true});
      setUpLocationSync(this.upgrade);
      this.angularjsRootModule = angularjsModule;
      return this.angularjsRootModule;
    }
  }
}

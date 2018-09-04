// tslint:disable:strict-boolean-expressions
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { setUpLocationSync } from '@angular/router/upgrade';
import { angularjsModule } from '../../angularjs/app/app.module';
import * as angular from 'angular';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';

@Injectable()
export class AngularJsBootstrapSingletonService {
  private angularjsRootModule?: angular.IModule;
  private loggerService: LoggerService;

  constructor(private upgrade: UpgradeModule, loggerFactory: LoggerFactory) {
    loggerFactory.createLoggerService('AngularJsBootstrapSingletonService');
  }

  public getInstance = (): angular.IModule => {
    if (this.angularjsRootModule) {
      return this.angularjsRootModule;
    } else {
      this.upgrade.bootstrap(document.body, [angularjsModule.name], { strictDi: true });
      try {
        setUpLocationSync(this.upgrade);
      } catch (error) {
        this.loggerService.error('Can not setUpLocationSync', String(error));
      }
      this.angularjsRootModule = angularjsModule;
      return this.angularjsRootModule;
    }
  };
}

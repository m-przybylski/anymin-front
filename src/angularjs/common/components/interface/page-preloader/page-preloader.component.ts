import { PagePreloaderComponentController } from './page-preloader.controller';
// tslint:disable:member-ordering
export class PagePreloaderComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = PagePreloaderComponentController;
  public template = require('./page-preloader.html');
  public bindings: { [boundProperty: string]: string } = {
  };
}

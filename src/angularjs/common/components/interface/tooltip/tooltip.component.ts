import { TooltioComponentController } from './tooltip.controller';

// tslint:disable:member-ordering
export class TooltipComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = TooltioComponentController;
  public template = require('./tooltip.html');
  public bindings: { [boundProperty: string]: string } = {
    tooltipText: '@'
  };
}

import { SimilarConsultationComponentController } from './similar-consultations.controller';
// tslint:disable:member-ordering
export class SimilarConsultationComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = SimilarConsultationComponentController;
  public template = require('./similar-consultations.html');
  public bindings: {[boundProperty: string]: string} = {
  };
}

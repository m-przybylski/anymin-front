import { SimilarConsultationComponentController } from './similar-consultations.controller';
export class SimilarConsultationComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl';
  controller: ng.Injectable<ng.IControllerConstructor> = SimilarConsultationComponentController;
  template = require('./similar-consultations.html');
  bindings: {[boundProperty: string]: string} = {
  };
}

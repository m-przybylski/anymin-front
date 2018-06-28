// tslint:disable:no-empty-interface
import * as angular from 'angular';
import { SimilarConsultationComponent } from './similar-consultations.component';
import tilesModule from '../../interface/tiles/tiles';

export interface ISimilarConsultationComponentBindings extends ng.IController {
}

const similarConsultationModule = angular.module('profitelo.components.profile.similar-consultation', [
  tilesModule
])
.component('similarConsultation', new SimilarConsultationComponent())
  .name;

export default similarConsultationModule;

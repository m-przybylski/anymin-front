import * as angular from 'angular'
import './similar-consultations.sass'
import {SimilarConsultationComponent} from './similar-consultations.component'

export interface ISimilarConsultationComponentBindings extends ng.IController {
}

const similarConsultationModule = angular.module('profitelo.components.profile.profile-header', [])
.component('similarConsultation', new SimilarConsultationComponent())
  .name

export default similarConsultationModule

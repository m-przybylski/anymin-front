import * as angular from 'angular'
import {SingleConsultationComponent} from './single-consultation.component'


export interface ISingleConsultationComponentBindings extends ng.IController{
}

const singleConsultationModule = angular.module('profitelo.components.profile.single-consultation', [
])
.component('singleConsultation', new SingleConsultationComponent())
  .name

export default singleConsultationModule

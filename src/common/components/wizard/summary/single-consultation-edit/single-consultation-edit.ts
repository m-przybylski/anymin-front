import * as angular from 'angular'
import {SingleConsultationEditComponent} from './single-consultation-edit.component'
import tagsListModule from '../../../tags-list/tags-list'
import {WizardService} from 'profitelo-api-ng/model/models'
import './single-consultation-edit.sass'

export interface ISingleConsultationEditComponentBindings extends ng.IController {
  service: WizardService
}

const singleConsultationEditModule = angular.module('profitelo.component.wizard.summary.single-consultation-edit', [
  tagsListModule

]).component('singleConsultationEdit', new SingleConsultationEditComponent)
  .name

export default singleConsultationEditModule

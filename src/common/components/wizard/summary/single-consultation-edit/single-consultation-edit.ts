import * as angular from 'angular'
import {SingleConsultationEditComponent} from './single-consultation-edit.component'
import tagsListModule from '../../../tags-list/tags-list'
import {WizardService} from 'profitelo-api-ng/model/models'
import './single-consultation-edit.sass'
import translatorWrapperModule, {default as translatorModule} from '../../../../services/translator/translator'

export interface ISingleConsultationEditComponentBindings extends ng.IController {
  service: WizardService
  onEdit: (service: WizardService) => void
  onRemove: (service: WizardService) => void
  isCompany: boolean
}

const singleConsultationEditModule = angular.module('profitelo.component.wizard.summary.single-consultation-edit', [
  tagsListModule,
  translatorWrapperModule,
  translatorModule

]).component('singleConsultationEdit', new SingleConsultationEditComponent)
  .name

export default singleConsultationEditModule

import * as angular from 'angular'
import {WizardUploaderComponent} from './wizard-uploader.component'
import './wizard-uploader.sass'
import uploaderModule from '../../../services/uploader/uploader'

export interface IWizardUploaderModuleComponentBindings extends ng.IController {
  tokenList: Array<string>
}

const wizardUploaderModule = angular.module('profitelo.components.wizard.wizard-uploader', [
  uploaderModule,
  'pascalprecht.translate'
])
.component('wizardUploader', new WizardUploaderComponent)
  .name

export default wizardUploaderModule

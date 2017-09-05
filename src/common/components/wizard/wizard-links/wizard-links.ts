import * as angular from 'angular'
import {WizardLinksComponent} from './wizard-links.component'
import '../../../directives/pro-social-icon-getter/pro-social-icon-getter'
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert'
import './wizard-links.sass'

export interface IWizardLinksComponentBindings extends ng.IController {
  selectedLinks: string[]
}

const wizardLinksModule = angular.module('profitelo.components.wizard.wizard-links', [
  'pascalprecht.translate',
  'profitelo.directives.pro-social-icon-getter',
  ValidationAlertModule

])
.component('wizardLinks', new WizardLinksComponent)
  .name

export default wizardLinksModule

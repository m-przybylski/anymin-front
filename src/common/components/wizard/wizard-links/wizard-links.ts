import * as angular from 'angular'
import {WizardLinksComponent} from './wizard-links.component'

export interface IWizardLinksComponentBindings extends ng.IController {
  selectedLinks: Array<string>
}

const wizardLinksModule = angular.module('profitelo.components.wizard.wizard-links', [
  'pascalprecht.translate',
  'profitelo.directives.pro-social-icon-getter'
])
.component('wizardLinks', new WizardLinksComponent)
  .name

export default wizardLinksModule

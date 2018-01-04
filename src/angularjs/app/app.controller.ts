import {InterfaceLanguageService} from '../common/services/interface-language/interface-language.service'

/* @ngInject */
export function AppComponentController(InterfaceLanguageService: InterfaceLanguageService): void {

  InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())

  return this
}

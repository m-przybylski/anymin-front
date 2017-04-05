import {InterfaceLanguageService} from '../common/services/interface-language/interface-language.service'

/* @ngInject */
export function AppComponentController(InterfaceLanguageService: InterfaceLanguageService) {

  InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())

  return this
}

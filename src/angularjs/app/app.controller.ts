import { InterfaceLanguageService } from '../common/services/interface-language/interface-language.service';

export function AppComponentController(InterfaceLanguageService: InterfaceLanguageService): void {

  InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage());

  return this;
}

import { CommonConfig } from '../../../../../generated_modules/common-config/common-config';
import { TranslatorService } from '../translator/translator.service';

export interface ILanguage {
  name: string;
  value: string;
}

export class LanguagesService {

  static $inject = ['translatorService', 'CommonConfig'];

    constructor(private translatorService: TranslatorService,
              private CommonConfig: CommonConfig) {}

  private languages: {
    shortcut: string,
    name: string,
    'native-name': string
  }[] = this.CommonConfig.getAllData().config['supported-languages'];

  public languagesList: ILanguage[] = this.languages.map((lng) =>
    ({
      name: this.translatorService.translate('LANGUAGE.' + lng.shortcut),
      value: lng.shortcut
    }));

}

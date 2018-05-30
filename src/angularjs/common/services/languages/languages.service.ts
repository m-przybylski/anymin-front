import { TranslatorService } from '../translator/translator.service';
import { CommonConfig } from '../../../../common-config';

export interface ILanguage {
  name: string;
  value: string;
}

// tslint:disable:member-ordering
export class LanguagesService {

  public static $inject = ['translatorService'];

    constructor(private translatorService: TranslatorService) {}

  private languages: {
    shortcut: string,
    name: string,
    'native-name': string
  }[] = CommonConfig.getCommonConfig().config['supported-languages'];

  public languagesList: ILanguage[] = this.languages.map((lng) =>
    ({
      name: this.translatorService.translate('LANGUAGE.' + lng.shortcut),
      value: lng.shortcut
    }));

}

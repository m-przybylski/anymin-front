// tslint:disable:readonly-array
// tslint:disable:prefer-template
import { TranslatorService } from '../translator/translator.service';

export interface ILanguage {
  name: string;
  value: string;
}

// tslint:disable:member-ordering
export class LanguagesService {

  public static $inject = ['translatorService'];

  constructor(private translatorService: TranslatorService) {}

  public static languages: {
    shortcut: string,
    name: string,
    'native-name': string
  }[] = [
    {
      shortcut: 'pl',
      name: 'Polish',
      'native-name': 'polski'
    },
    {
      shortcut: 'en',
      name: 'English',
      'native-name': 'English'
    },
    {
      shortcut: 'ru',
      name: 'Russian',
      'native-name': 'русский язык'
    },
    {
      shortcut: 'pt',
      name: 'Portuguese',
      'native-name': 'Português'
    },
    {
      shortcut: 'ja',
      name: 'Japanese',
      'native-name': '日本語 (にほんご／にっぽんご)'
    },
    {
      shortcut: 'it',
      name: 'Italian',
      'native-name': 'Italiano'
    },
    {
      shortcut: 'hu',
      name: 'Hungarian',
      'native-name': 'Magyar'
    },
    {
      shortcut: 'de',
      name: 'German',
      'native-name': 'Deutsch'
    },
    {
      shortcut: 'el',
      name: 'Greek',
      'native-name': 'Ελληνικά'
    },
    {
      shortcut: 'fr',
      name: 'French',
      'native-name': 'français, langue française'
    },
    {
      shortcut: 'hr',
      name: 'Croatian',
      'native-name': 'hrvatski'
    },
    {
      shortcut: 'cs',
      name: 'Czech',
      'native-name': 'česky, čeština'
    },
    {
      shortcut: 'da',
      name: 'Danish',
      'native-name': 'dansk'
    },
    {
      shortcut: 'zh',
      name: 'Chinese',
      'native-name': '中文 (Zhōngwén), 汉语, 漢語'
    },
    {
      shortcut: 'bg',
      name: 'Bulgarian',
      'native-name': 'български език'
    },
    {
      shortcut: 'ar',
      name: 'Arabic',
      'native-name': 'العربية'
    }
  ];

  public languagesList: ILanguage[] = LanguagesService.languages.map((lng) =>
    ({
      name: this.translatorService.translate('LANGUAGE.' + lng.shortcut),
      value: lng.shortcut
    }));

}

import {CommonConfig} from '../../../../generated_modules/common-config/common-config'
import {IFilterService} from '../filter/filter.service'

export interface ILanguage {
  name: string,
  value: string
}

export class LanguagesService {

  /* @ngInject */
  constructor(private $filter: IFilterService,
              private CommonConfig: CommonConfig) {}

  private languages: {
    shortcut: string,
    name: string,
    'native-name': string
  }[] = this.CommonConfig.getAllData().config['supported-languages']

  public languagesList: ILanguage[] = this.languages.map((lng) =>
    ({
      name: (this.$filter('translate')(this.$filter('normalizeTranslationKey')(('LANGUAGE.' + lng.shortcut)))),
      value: lng.shortcut
    }))

}

import {IFilterService} from '../filter/filter.service'
export class TranslatorService {

    constructor(private $filter: IFilterService) {
  }

  public translate = (translationKey: string): string =>
    (this.$filter('translate')(this.$filter('normalizeTranslationKey')((translationKey))))
}

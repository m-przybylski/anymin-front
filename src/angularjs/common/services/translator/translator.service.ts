// tslint:disable:readonly-array
import { IFilterService } from '../filter/filter.service';
// tslint:disable:member-ordering
export class TranslatorService {

  public static $inject = ['$filter'];

    constructor(private $filter: IFilterService) {
  }

  public translate = (translationKey: string): string =>
    (this.$filter('translate')(this.$filter('normalizeTranslationKey')((translationKey))))
}

// tslint:disable:readonly-array
// tslint:disable:no-empty
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';

// tslint:disable:member-ordering
export class CustomTranslationHandlerService {

  private static _exceptionsStrings = [
    'Do not report this dummy translate string, for ex like icon below',
    '<i class="icon icon-home icon-sm"></i>'
  ];

  public static $inject = [];

  constructor() {
  }

  public handler = (translationId: string, _uses: string): void => {
    if (translationId !== void 0 && !_.includes(CustomTranslationHandlerService._exceptionsStrings, translationId)) {
      // const str = 'Missing [' + uses + '] translations for: ' + translationId
      // TODO: move error reporting to sentry
      // this.$log.error(_str)
    }
  }

  public static getInstance(): (translationId: string, _uses: string) => void {
    return (new CustomTranslationHandlerService()).handler;
  }
}

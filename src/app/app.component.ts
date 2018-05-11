import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '@anymind-ng/core';
import { VERSION } from '../../generated_modules/version/version';
const polishTranslations = require('../../generated_modules/angular-translations/pl-pl.json');
const englishTranslations = require('../../generated_modules/angular-translations/en-us.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private logger: LoggerService,
              translate: TranslateService) {
    this.printVersion();

    translate.setTranslation('pl', polishTranslations);
    translate.setTranslation('en', englishTranslations);
    translate.addLangs(['en', 'pl']);

    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();

    translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
  }

  private printVersion = (): void => {
    this.logger.info(`Application Version: ${VERSION.hash}`, VERSION);
  }

}

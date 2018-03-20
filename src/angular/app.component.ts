import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const polishTranslations = require('../../generated_modules/angular-translations/pl-pl.json');
const englishTranslations = require('../../generated_modules/angular-translations/en-us.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setTranslation('pl', polishTranslations);
    translate.setTranslation('en', englishTranslations);
    translate.addLangs(['en', 'pl']);

    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();

    translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
  }
}

// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '@anymind-ng/core';
import { VERSION } from '../../generated_modules/version/version';
import { EnvironmentService } from './core/services/environment/environment.service';
import { CallInvitationService } from './core/services/call/call-invitation.service';

const polishTranslations = require('../../lib/angular-translations/pl-pl.json');
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    private logger: LoggerService,
    private expertCallService: CallInvitationService,
    translate: TranslateService,
  ) {
    this.printVersion();
    this.printEnvironment();

    translate.setTranslation('pl', polishTranslations);
    translate.addLangs(['pl']);

    translate.setDefaultLang('pl');
    translate.use('pl');

    // no maintain of english translations. Turn back on when
    // specific decision is taken
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|pl/) ? browserLang : 'pl');

    moment.locale('pl-PL');

    // Initialize communicator after translations are loaded
    this.expertCallService.initialize();
  }

  private printVersion = (): void => {
    this.logger.info(`Application version: ${VERSION.hash}`, VERSION);
  };

  private printEnvironment = (): void => {
    this.logger.info(`Application environment: ${EnvironmentService.get()}`);
  };
}

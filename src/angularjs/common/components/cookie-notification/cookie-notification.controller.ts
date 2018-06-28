// tslint:disable:readonly-array
import { CookieNotificationService } from './cookie-notification.service';
import { CommonConfig } from '../../../../common-config';

interface ICookieHref {
  hrefUrl: string;
}

// tslint:disable:member-ordering
export class CookieNotificationComponentController implements ng.IController {

  public cookieTranslationHref: ICookieHref;

  public static $inject = ['cookieNotificationService'];

    constructor(private cookieNotificationService: CookieNotificationService) {

    this.cookieTranslationHref = {
      hrefUrl: CommonConfig.getCommonConfig().urls['privacy-policy']
    };
  }

  public onClick = (): void =>
    this.cookieNotificationService.hideNotification()

  public isVisible = (): boolean =>
    this.cookieNotificationService.isNotificationHidden()
}

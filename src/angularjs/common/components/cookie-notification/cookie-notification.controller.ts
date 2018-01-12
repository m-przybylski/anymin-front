import {CommonConfig} from '../../../../../generated_modules/common-config/common-config'
import {CookieNotificationService} from './cookie-notification.service'

interface ICookieHref {
  hrefUrl: string
}

export class CookieNotificationComponentController implements ng.IController {

  public cookieTranslationHref: ICookieHref

  static $inject = ['cookieNotificationService', 'CommonConfig'];

    constructor(private cookieNotificationService: CookieNotificationService,
              CommonConfig: CommonConfig) {

    this.cookieTranslationHref = {
      hrefUrl: CommonConfig.getAllData().urls['privacy-policy']
    }
  }

  public onClick = (): void =>
    this.cookieNotificationService.hideNotification();

  public isVisible = (): boolean =>
    this.cookieNotificationService.isNotificationHidden();
}

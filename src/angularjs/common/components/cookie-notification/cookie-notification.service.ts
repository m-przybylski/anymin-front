import {ICookiesService, CookiesKeyName} from '../../services/cookie/cookie.service'
import {Config} from '../../../../config';

export class CookieNotificationService {
  private static readonly cookieKeyValue: string = 'true'

  static $inject = ['$cookies'];

    constructor(private $cookies: ICookiesService) {
  }

  public hideNotification = (): void =>
    this.$cookies.put(Config.cookies.cookieNotification.key, CookieNotificationService.cookieKeyValue,
      {expires: this.getCookieNotificationExpirationDate()})

  public isNotificationHidden = (): boolean =>
    this.isCookieDefined(Config.cookies.cookieNotification.key)

  private isCookieDefined = (cookieKey: CookiesKeyName): boolean =>
    this.$cookies.get(cookieKey) !== undefined

  private getCookieNotificationExpirationDate = (): Date =>
    new Date(this.getCookieExpirationYear(), Config.cookies.cookieNotification.month)

  private getCookieExpirationYear = (): number =>
    new Date().getFullYear() + Config.cookies.cookieNotification.yearDelta

}

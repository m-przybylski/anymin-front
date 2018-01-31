import { ICookiesService, CookiesKeyName } from '../../services/cookie/cookie.service';
import { Config } from '../../../../config';

// tslint:disable:member-ordering
// tslint:disable:strict-type-predicates
export class CookieNotificationService {
  private static readonly cookieKeyValue = 'true';

  public static $inject = ['$cookies'];

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

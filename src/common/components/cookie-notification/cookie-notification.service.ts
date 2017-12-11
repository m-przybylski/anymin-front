import {ICookiesService, CookiesKeyName} from '../../services/cookie/cookie.service'
import {CookieNotificationExpirationTime} from '../../constants/time.constatnt'

export class CookieNotificationService {

  private static readonly cookieKey: CookiesKeyName = 'anymind-cookie'
  private static readonly cookieKeyValue: string = 'true'
  private readonly date = new Date()

  /* @ngInject */
  constructor(private $cookies: ICookiesService) {
  }

  private isCookieDefined = (cookieKey: CookiesKeyName): boolean =>
    this.$cookies.get(cookieKey) !== undefined

  public hideNotification = (): void =>
    this.$cookies.put(CookieNotificationService.cookieKey, CookieNotificationService.cookieKeyValue,
      {expires: new Date(this.setCookieNotificationExpiration(), CookieNotificationExpirationTime.month)})

  private setCookieNotificationExpiration = (): number =>
    this.date.getFullYear() + CookieNotificationExpirationTime.yearDelta

  public isNotificationHidden = (): boolean =>
    this.isCookieDefined(CookieNotificationService.cookieKey)
}

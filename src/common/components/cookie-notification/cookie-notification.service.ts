import {ICookiesService, CookiesKeyName} from '../../services/cookie/cookie.service'

export class CookieNotificationService {

  private static readonly cookieKey: CookiesKeyName = 'anymind-cookie'
  private static readonly cookieKeyValue: string = 'true'

  /* @ngInject */
  constructor(private $cookies: ICookiesService) {}

  private isCookieDefined = (cookieKey: CookiesKeyName): boolean =>
    this.$cookies.get(cookieKey) !== undefined

  public hideNotification = (): void =>
    this.$cookies.put(CookieNotificationService.cookieKey, CookieNotificationService.cookieKeyValue)

  public isNotificationHidden = (): boolean =>
    this.isCookieDefined(CookieNotificationService.cookieKey)
}

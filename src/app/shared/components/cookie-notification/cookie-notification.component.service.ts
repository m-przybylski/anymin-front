import { Config } from '../../../../config';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { CrawlerService } from '@platform/core/services/crawler/crawler.service';

@Injectable()
export class CookieNotificationComponentService {
  private readonly cookieValue = 'true';

  constructor(private cookieService: CookieService, private crawlerService: CrawlerService) {}

  public hideNotification = (): void => {
    this.cookieService.set(
      Config.cookies.cookieNotification.key,
      this.cookieValue,
      this.getCookieNotificationExpirationDate(),
    );
  };

  public isNotificationVisible = (): boolean =>
    !this.crawlerService.isCrawlerBot() && this.isCookieNotDefined(Config.cookies.cookieNotification.key);

  private isCookieNotDefined = (cookieKey: string): boolean => !this.cookieService.check(cookieKey);

  private getCookieNotificationExpirationDate = (): Date =>
    new Date(this.getCookieExpirationYear(), Config.cookies.cookieNotification.month);

  private getCookieExpirationYear = (): number =>
    new Date().getFullYear() + Config.cookies.cookieNotification.yearDelta;
}

import { Config } from '../../../../config';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()
export class CookieNotificationComponentService {
  private readonly cookieValue = 'true';

  constructor(private cookieService: CookieService) {}

  public hideNotification(): void {
    this.cookieService.set(
      Config.cookies.cookieNotification.key,
      this.cookieValue,
      this.getCookieNotificationExpirationDate(),
    );
  }

  public isNotificationVisible(): boolean {
    return this.isCookieNotDefined(Config.cookies.cookieNotification.key);
  }

  private isCookieNotDefined(cookieKey: string): boolean {
    return !this.cookieService.check(cookieKey);
  }

  private getCookieNotificationExpirationDate(): Date {
    return new Date(this.getCookieExpirationYear(), Config.cookies.cookieNotification.month);
  }

  private getCookieExpirationYear(): number {
    return new Date().getFullYear() + Config.cookies.cookieNotification.yearDelta;
  }
}

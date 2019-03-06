import { Component } from '@angular/core';
import { CookieNotificationComponentService } from './cookie-notification.component.service';

@Component({
  selector: 'plat-cookie-notification',
  templateUrl: './cookie-notification.component.html',
  styleUrls: ['./cookie-notification.component.sass'],
})
export class CookieNotificationComponent {
  public isNotificationVisible = true;

  constructor(private cookieComponentService: CookieNotificationComponentService) {
    this.isNotificationVisible = this.cookieComponentService.isNotificationVisible();
  }

  public onClick(): void {
    this.cookieComponentService.hideNotification();
    this.isNotificationVisible = false;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { CookieNotificationComponent } from './cookie-notification.component';
import { CookieNotificationComponentService } from './cookie-notification.component.service';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@platform/shared/components/atomic-components';

@NgModule({
  imports: [CommonModule, AnymindComponentsModule, TranslateModule, ButtonModule],
  declarations: [CookieNotificationComponent],
  providers: [CookieService, CookieNotificationComponentService],
  exports: [CookieNotificationComponent],
})
export class CookieNotificationModule {}

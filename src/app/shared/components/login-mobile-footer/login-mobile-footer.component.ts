// tslint:disable:no-empty
import { Component } from '@angular/core';

@Component({
  selector: 'plat-login-mobile-footer',
  templateUrl: './login-mobile-footer.component.html',
  styleUrls: ['./login-mobile-footer.component.sass']
})

export class LoginMobileFooterComponent {

  private readonly googlePlayStoreUrl = 'https://play.google.com/store/apps/details?id=com.anymind.app';

  constructor() {}

  public openGooglePlayStoreInNewTab = (): void => {
    window.open(this.googlePlayStoreUrl, '_blank');
  }

}

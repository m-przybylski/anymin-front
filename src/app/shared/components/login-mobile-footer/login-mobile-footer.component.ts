// tslint:disable:no-empty
import { Component } from '@angular/core';
import { CommonConfig } from '../../../../common-config';

@Component({
  selector: 'plat-login-mobile-footer',
  templateUrl: './login-mobile-footer.component.html',
  styleUrls: ['./login-mobile-footer.component.sass']
})

export class LoginMobileFooterComponent {

  private readonly googlePlayStoreUrl = CommonConfig.getCommonConfig().urls['play-store'];

  constructor() {}

  public openGooglePlayStoreInNewTab = (): void => {
    window.open(this.googlePlayStoreUrl, '_blank');
  }

}

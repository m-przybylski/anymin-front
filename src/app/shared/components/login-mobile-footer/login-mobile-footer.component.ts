import { Component } from '@angular/core';
import { CommonConfig } from '../../../../../generated_modules/common-config/common-config';

@Component({
  selector: 'login-mobile-footer',
  templateUrl: './login-mobile-footer.component.html',
  styleUrls: ['./login-mobile-footer.component.sass']
})

export class LoginMobileFooterComponent {

  private readonly googlePlayStoreUrl = this.CommonConfig.getAllData().urls['play-store'];

  constructor(private CommonConfig: CommonConfig) {}

  public openGooglePlayStoreInNewTab = (): void => {
    window.open(this.googlePlayStoreUrl, '_blank');
  }

}

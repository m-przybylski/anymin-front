// tslint:disable:no-empty
import { Component } from '@angular/core';
import { Config } from '../../../../config';

@Component({
  selector: 'plat-login-mobile-footer',
  templateUrl: './login-mobile-footer.component.html',
  styleUrls: ['./login-mobile-footer.component.sass'],
})
export class LoginMobileFooterComponent {
  public openGooglePlayStoreInNewTab = (): void => {
    window.open(Config.links.googlePlay, '_blank');
  };
}

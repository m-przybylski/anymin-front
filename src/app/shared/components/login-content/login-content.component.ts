// tslint:disable:no-empty
import { Component, Input } from '@angular/core';
import { Config } from '../../../../config';

@Component({
  selector: 'plat-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.sass'],
})
export class LoginContentComponent {
  @Input('titleText') public titleTrKey?: string;

  @Input('subTitle') public subTitleTrKey?: string;

  @Input() public msisdn?: string;

  @Input() public tooltipText?: string;

  public urlIcons = Config.assetsUrl.icons;

  constructor() {}
}

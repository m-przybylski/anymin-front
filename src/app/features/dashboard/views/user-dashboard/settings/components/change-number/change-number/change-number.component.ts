import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonSettingsService } from '../../../../../../../../../angularjs/common/services/common-settings/common-settings.service';
import { UserSessionService } from '../../../../../../../../core/services/user-session/user-session.service';

@Component({
  selector: 'plat-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.sass']
})
export class ChangeNumberComponent implements OnInit {

  public readonly changeNumberFormId = 'msisdnForm';
  public readonly msisdnControlName = 'msisdn';

  public changeNumberForm: FormGroup;
  public msisdnPrefix: string = this.CommonSettingsService.localSettings.countryCodes[0];
  public isRequestPending = false;
  public isInputInitialFocused = true;
  public isInputRequired = true;

  public isDisabled = false;

  private readonly msisdnLength = 3;
  private userPhoneNumber: string;

  constructor(private CommonSettingsService: CommonSettingsService,
              private userService: UserSessionService) {
  }

  public ngOnInit(): void {
    this.changeNumberForm = new FormGroup({});
    this.userService.getSession().then((user) => {
      const account = user.account;
      if (typeof account !== 'undefined') {
        this.userPhoneNumber = account.msisdn.slice(this.msisdnLength);
        this.changeNumberForm.controls[this.msisdnControlName].valueChanges.subscribe(this.onMsisdnChange);
        this.changeNumberForm.controls[this.msisdnControlName].setValue(this.userPhoneNumber);
      }
    });
  }

  private onMsisdnChange = (msisdn: string): void => {
    this.isDisabled = this.userPhoneNumber === msisdn;
  }

}

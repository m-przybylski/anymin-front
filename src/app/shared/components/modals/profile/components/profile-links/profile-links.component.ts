// tslint:disable:readonly-array
import { Component, forwardRef, Input } from '@angular/core';
import { Animations } from '@anymind-ng/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ProfileLinksComponentService } from './profile-links.component.service';

export interface ILinkList {
  link: string;
  shortName?: string;
  icon?: string;
}

export const PROFILE_LINKS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => ProfileLinksComponent),
  multi: true,
};

@Component({
  selector: 'plat-profile-links',
  styleUrls: ['./profile-links.component.sass'],
  templateUrl: './profile-links.component.html',
  animations: Animations.addItemAnimation,
  providers: [PROFILE_LINKS_ACCESSOR],
})
export class ProfileLinksComponent implements ControlValueAccessor {
  @Input()
  public isDisabled = false;
  /**
   * http patter from: https://www.regextester.com/94502
   */
  public readonly urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  public linksList: ILinkList[] = [];
  public linksFormControl = new FormControl('', {
    updateOn: 'change',
  });

  private onModelChange: (value: string[]) => void;

  constructor(private profileLinksComponentService: ProfileLinksComponentService) {}

  public writeValue(items: string[] | null): void {
    if (items !== null) {
      items.forEach(item => this.addLink(item));
    }
  }

  public registerOnChange(fn: (value: string[]) => void): void {
    this.onModelChange = fn;
  }

  // tslint:disable-next-line:no-any
  // tslint:disable-next-line:no-empty
  public registerOnTouched(_fn: any): void {}

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onChangeValue(inputValue: string): void {
    if (this.isValueExist(this.unifyLinkProtocol(inputValue))) {
      this.linksFormControl.setErrors({
        'EDIT_PROFILE.CONTENT.CREATE_EXPERT_PROFILE.ADD_LINK.VALIDATION.VALUE_EXIST': true,
      });
    } else {
      /** no error add link to the list and clear input */
      this.addLink(this.unifyLinkProtocol(inputValue));
      this.linksFormControl.setValue('');
    }
  }

  /**
   * function parses and adds link to internal state
   */
  public addLink(value: string): void {
    if (this.profileLinksComponentService.isSocialLink(value)) {
      this.linksList.push({
        link: value,
        shortName: this.profileLinksComponentService.cropSocialMediaLinkAsName(this.unifyLinkProtocol(value)).url,
        icon: this.profileLinksComponentService.cropSocialMediaLinkAsName(this.unifyLinkProtocol(value)).icon,
      });
    } else if (value.length > 0) {
      this.linksList.push({ link: value });
    }
    this.onModelChange(this.getRawLinks());
  }

  public onDeleteClick(deleteItem: ILinkList): void {
    this.linksList = this.linksList.filter(item => item !== deleteItem);
    this.onModelChange(this.getRawLinks());
  }

  public isValueExist(value: string): boolean {
    return this.linksList.filter(item => item.link === value).length > 0;
  }

  private unifyLinkProtocol(value: string): string {
    return this.profileLinksComponentService.unifyLinkProtocol(value);
  }

  private getRawLinks(): string[] {
    return this.linksList.map(link => link.link);
  }
}

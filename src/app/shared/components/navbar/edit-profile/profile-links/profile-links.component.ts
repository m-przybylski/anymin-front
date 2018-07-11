// tslint:disable:readonly-array
// tslint:disable:no-shadowed-variable
import {
  Component, Input
} from '@angular/core';
import { LoggerFactory, LoggerService, Animations, FormUtilsService } from '@anymind-ng/core';
import { FormGroup } from '@angular/forms';
import {
  CommonSettingsService
}
  from '../../../../../../angularjs/common/services/common-settings/common-settings.service';
import { ProfileLinksComponentErrorEnum } from './input-link/input-link.component';
import { ProfileLinksComponentService } from './profile-links.component.service';

interface ILinkList {
  link: string;
  shortName?: string;
  icon?: string;
}

@Component({
  selector: 'plat-profile-links',
  styleUrls: ['./profile-links.component.sass'],
  templateUrl: './profile-links.component.html',
  animations: Animations.addItemAnimation,
  providers: [ProfileLinksComponentService]

})
export class ProfileLinksComponent {

  @Input()
  public formGroup: FormGroup;

  @Input()
  public controlName: string;

  public linksList: ILinkList[] = [];
  public urlPattern: RegExp;
  private logger: LoggerService;

  constructor(private formUtils: FormUtilsService,
              private profileLinksComponentService: ProfileLinksComponentService,
              loggerFactory: LoggerFactory,
              CommonSettingsService: CommonSettingsService) {
    this.logger = loggerFactory.createLoggerService('ProfileLinksComponent');
    this.urlPattern = CommonSettingsService.localSettings.urlPattern;
  }

  public onChangeValue = (inputValue: string): void =>
    this.isInputValueCorrect(inputValue)

  public isInputValueCorrect = (value: string): void => {
    if (this.formGroup.controls[this.controlName].valid) {
      if (this.isValueExist(this.unifyLinkProtocol(value))) {
        this.formGroup.controls[this.controlName].setErrors({[ProfileLinksComponentErrorEnum.ValueExist]: true});
        this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
      } else {
        this.addElement(this.unifyLinkProtocol(value));
      }
    } else {
      this.formGroup.controls[this.controlName].setErrors({[ProfileLinksComponentErrorEnum.IncorrectValue]: true});
      this.formUtils.isFieldInvalid(this.formGroup, this.controlName);
    }
  }

  public addElement = (value: string): void => {
    if (this.profileLinksComponentService.isSocialLink(value)) {
      this.linksList.push({
        link: value,
        shortName: this.profileLinksComponentService.cropSocialMediaLinkAsName(this.unifyLinkProtocol(value)).url,
        icon: this.profileLinksComponentService.cropSocialMediaLinkAsName(this.unifyLinkProtocol(value)).icon
      });
    } else if (value.length > 0) {
      this.linksList.push({link: value});
    }
    this.clearInputValue();
  }

  public onDeleteClick = (deleteItem: ILinkList): ILinkList[] =>
    this.linksList = this.linksList.filter(item => item !== deleteItem)

  public isValueExist = (value: string): boolean =>
    this.linksList.filter(item => item.link === value).length > 0

  private clearInputValue = (): void =>
    this.formGroup.controls[this.controlName].setValue('')

  private unifyLinkProtocol = (value: string): string =>
    this.profileLinksComponentService.unifyLinkProtocol(value)
}

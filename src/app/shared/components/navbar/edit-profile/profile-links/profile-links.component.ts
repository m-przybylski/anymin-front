import {
  Component, Input
} from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { FormGroup } from '@angular/forms';
import {
  CommonSettingsService
}
  from '../../../../../../angularjs/common/services/common-settings/common-settings.service';
import { Config } from '../../../../../../config';
import { Animations, FormUtilsService } from '@anymind-ng/components';
import { ProfileLinksComponentErrorEnum } from './input-link/input-link.component';

interface IShortLink {
  url: string;
  icon: string;
}

interface ILinkList {
  link: string;
  shortName?: string;
  icon?: string;
}

@Component({
  selector: 'plat-profile-links',
  styleUrls: ['./profile-links.component.sass'],
  templateUrl: './profile-links.component.html',
  animations: Animations.addItemAnimation

})
export class ProfileLinksComponent {

  @Input()
  public formGroup: FormGroup;

  @Input()
  public controlName: string;

  public linksList: ILinkList[] = [];
  private logger: LoggerService;
  private urlPattern: RegExp;

  constructor(private formUtils: FormUtilsService,
              loggerFactory: LoggerFactory,
              CommonSettingsService: CommonSettingsService) {
    this.logger = loggerFactory.createLoggerService('ProfileLinksComponent');
    this.urlPattern = CommonSettingsService.localSettings.urlPattern;
  }

  public onChangeValue = (inputValue: string): void =>
    this.isInputValueCorrect(inputValue)

  public isInputValueCorrect = (value: string): void => {
    if (this.formGroup.valid) {
      if (this.isValueExist(this.unifyLinkProtocol(value))) {
        this.formGroup.controls[this.controlName].setErrors({[ProfileLinksComponentErrorEnum.ValueExist]: true});
        this.formUtils.validateAllFormFields(this.formGroup);
      } else {
        this.addElement(this.unifyLinkProtocol(value));
      }
    } else {
      this.formGroup.controls[this.controlName].setErrors({[ProfileLinksComponentErrorEnum.IncorrectValue]: true});
      this.formUtils.validateAllFormFields(this.formGroup);
    }
  }

  public addElement = (value: string): void => {
    if (this.isSocialLink(value)) {
      this.linksList.push({
        link: value,
        shortName: this.cropSocialLinkParameterAsName(this.unifyLinkProtocol(value)).url,
        icon: this.cropSocialLinkParameterAsName(this.unifyLinkProtocol(value)).icon
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

  private unifyLinkProtocol = (value: string): string => {
    if (this.isSocialLink(value)) {
      return this.checkSocialLinkProtocol(value);
    } else {
      return this.checkAddressLinkProtocol(value);
    }
  }

  // tslint:disable:cyclomatic-complexity
  private checkSocialLinkProtocol = (addressUrl: string): string => {
    if (addressUrl.startsWith(Config.webProtocols.wwwProtocol)) {
      return addressUrl.replace(Config.webProtocols.wwwProtocol, Config.webProtocols.httpsWwwProtocol);
    } else if (addressUrl.startsWith(Config.webProtocols.httpWwwProtocol)) {
      return addressUrl.replace(Config.webProtocols.httpWwwProtocol, Config.webProtocols.httpsWwwProtocol);
    } else if (addressUrl.startsWith(Config.webProtocols.httpsProtocol)
      && !addressUrl.startsWith(Config.webProtocols.httpsWwwProtocol)) {
      return addressUrl.replace(Config.webProtocols.httpsProtocol, Config.webProtocols.httpsWwwProtocol);
    } else if (addressUrl.startsWith(Config.webProtocols.httpProtocol) &&
      !addressUrl.includes(Config.webProtocols.httpWwwProtocol)) {
      return addressUrl.replace(Config.webProtocols.httpProtocol, Config.webProtocols.httpsWwwProtocol);
    } else {
      return addressUrl;
    }
  }

  // tslint:disable:cyclomatic-complexity
  private checkAddressLinkProtocol = (addressUrl: string): string => {
    if (addressUrl.startsWith(Config.webProtocols.wwwProtocol)) {
      return addressUrl.replace(Config.webProtocols.wwwProtocol, Config.webProtocols.httpWwwProtocol);
    } else if (addressUrl.startsWith(Config.webProtocols.httpWwwProtocol)) {
      return addressUrl.replace(Config.webProtocols.httpWwwProtocol, Config.webProtocols.httpWwwProtocol);
    } else if (addressUrl.startsWith(Config.webProtocols.httpsProtocol)
      && !addressUrl.startsWith(Config.webProtocols.httpsWwwProtocol)) {
      return addressUrl.replace(Config.webProtocols.httpsProtocol, Config.webProtocols.httpsWwwProtocol);
    } else if (addressUrl.startsWith(Config.webProtocols.httpProtocol) &&
      !addressUrl.includes(Config.webProtocols.httpWwwProtocol)) {
      return addressUrl.replace(Config.webProtocols.httpProtocol, Config.webProtocols.httpWwwProtocol);
    } else {
      return addressUrl;
    }
  }

  private isSocialLink = (value: string): boolean =>
    (value.includes('facebook.com') || value.includes('twitter.com') ||
      value.includes('linkedin.com'))

  private cropSocialLinkParameterAsName = (link: string): IShortLink => {
    const socialMediaLinks = {
      facebook: {
        url: 'https://www.facebook.com/',
        icon: 'icon icon-facebook'
      },
      twitter: {
        url: 'https://www.twitter.com/',
        icon: 'icon icon-twitter'
      },
      linkedIn: {
        url: 'https://www.linkedin.com/in/',
        icon: 'icon icon-linkedin'
      }
    };

    let shortLink: IShortLink = {
      icon: '',
      url: ''
    };

    if (link.includes(socialMediaLinks.facebook.url)) {
      shortLink = {
        url: link.split(socialMediaLinks.facebook.url)[1],
        icon: socialMediaLinks.facebook.icon
      };
    } else if (link.includes(socialMediaLinks.twitter.url)) {
      shortLink = {
        url: link.split(socialMediaLinks.twitter.url)[1],
        icon: socialMediaLinks.twitter.icon
      };
    } else if (link.includes(socialMediaLinks.linkedIn.url)) {
      shortLink = {
        url: link.split(socialMediaLinks.linkedIn.url)[1],
        icon: socialMediaLinks.linkedIn.icon
      };
    }
    return shortLink;
  }
}

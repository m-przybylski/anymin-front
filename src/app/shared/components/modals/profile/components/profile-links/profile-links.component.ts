// tslint:disable:readonly-array
// tslint:disable:no-shadowed-variable
import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { Animations, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProfileLinksComponentService } from './profile-links.component.service';
import {
  CommonSettingsService
}
  from '../../../../../../../angularjs/common/services/common-settings/common-settings.service';
import { AddItemTypeEnum } from '../../../../inputs/input-add-item/input-add-item.component';

export interface ILinkList {
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
export class ProfileLinksComponent implements OnInit {

  @Input()
  public form: FormGroup;

  @Input()
  public controlName: string;

  @Input()
  public itemsList: string[] = [];

  @Input()
  public isDisabled = false;

  @Output()
  public linksListEmitter$: EventEmitter<string[]> = new EventEmitter<string[]>();

  public linksList: ILinkList[] = [];
  public urlPattern: RegExp;
  private linksListUnify: string[] = [];
  private logger: LoggerService;

  constructor(private formUtils: FormUtilsService,
              private profileLinksComponentService: ProfileLinksComponentService,
              loggerFactory: LoggerFactory,
              CommonSettingsService: CommonSettingsService) {
    this.logger = loggerFactory.createLoggerService('ProfileLinksComponent');
    this.urlPattern = CommonSettingsService.localSettings.urlPattern;
  }

  public ngOnInit(): void {
    this.form.addControl(this.controlName,
      new FormControl('', [Validators.pattern(this.urlPattern)]));
    if (this.itemsList.length > 0) {
      this.itemsList.forEach(item => this.addElement(item));
    }
  }

  public onChangeValue = (inputValue: string): void =>
    this.isInputValueCorrect(inputValue)

  public isInputValueCorrect = (value: string): void => {
    if (this.form.controls[this.controlName].valid) {
      if (this.isValueExist(this.unifyLinkProtocol(value))) {
        this.form.controls[this.controlName].setErrors({[AddItemTypeEnum.VALUE_ADDED]: true});
        this.formUtils.isFieldInvalid(this.form, this.controlName);
      } else {
        this.addElement(this.unifyLinkProtocol(value));
      }
    } else {
      this.form.controls[this.controlName].setErrors({[AddItemTypeEnum.INCORRECT_VALUE]: true});
      this.formUtils.isFieldInvalid(this.form, this.controlName);
    }
  }

  public addElement = (value: string): void => {
    if (this.profileLinksComponentService.isSocialLink(value)) {
      this.linksList.push({
        link: value,
        shortName: this.profileLinksComponentService.cropSocialMediaLinkAsName(this.unifyLinkProtocol(value)).url,
        icon: this.profileLinksComponentService.cropSocialMediaLinkAsName(this.unifyLinkProtocol(value)).icon
      });
      this.emitItemsList();
    } else if (value.length > 0) {
      this.linksList.push({link: value});
      this.emitItemsList();
    }
    this.clearInputValue();
  }

  public onDeleteClick = (deleteItem: ILinkList): void => {
    this.linksList = this.linksList.filter(item => item !== deleteItem);
    this.emitItemsList();
  }

  public isValueExist = (value: string): boolean =>
    this.linksList.filter(item => item.link === value).length > 0

  private emitItemsList = (): void => {
    this.linksListUnify = this.linksList.map(map => map.link);
    this.linksListEmitter$.emit(this.linksListUnify);
  }

  private clearInputValue = (): void =>
    this.form.controls[this.controlName].setValue('')

  private unifyLinkProtocol = (value: string): string =>
    this.profileLinksComponentService.unifyLinkProtocol(value)
}

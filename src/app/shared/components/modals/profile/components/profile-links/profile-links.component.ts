// tslint:disable:readonly-array
import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Animations, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProfileLinksComponentService } from './profile-links.component.service';

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
})
export class ProfileLinksComponent implements OnInit, AfterViewInit {
  @Input()
  public form: FormGroup;

  @Input()
  public controlName: string;

  @Input()
  public set itemsList(items: string[]) {
    /** check if component has been already initialized */
    if (this.form.contains(this.controlName)) {
      items.forEach(item => this.addLink(item));
    }
    /** store value for later use */
    this._itemsList = items;
  }

  @Input()
  public isDisabled = false;

  @Output()
  public linksListEmitter$: EventEmitter<string[]> = new EventEmitter<string[]>();

  public linksList: ILinkList[] = [];
  public urlPattern: RegExp;
  private _itemsList: string[];
  private linksListUnify: string[] = [];
  private logger: LoggerService;

  constructor(
    private formUtils: FormUtilsService,
    private profileLinksComponentService: ProfileLinksComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ProfileLinksComponent');
    /**
     * http patter from: https://www.regextester.com/94502
     */
    this.urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  }

  public ngOnInit(): void {
    this.form.addControl(this.controlName, new FormControl('', [Validators.pattern(this.urlPattern)]));
  }

  public ngAfterViewInit(): void {
    /**
     * once forms are cleaned up it is possible to move this part to form creation
     * TODO: refactor after forms refactor is completed.
     */
    this._itemsList.forEach(item => this.addLink(item));
  }

  public onChangeValue(inputValue: string): void {
    this.isInputValueCorrect(inputValue);
  }

  public isInputValueCorrect(value: string): void {
    if (this.form.controls[this.controlName].valid && this.urlPattern.test(value)) {
      if (this.isValueExist(this.unifyLinkProtocol(value))) {
        this.form.controls[this.controlName].setErrors({
          'EDIT_PROFILE.CONTENT.CREATE_EXPERT_PROFILE.ADD_LINK.VALIDATION.VALUE_EXIST': true,
        });
        this.formUtils.isFieldInvalid(this.form, this.controlName);
      } else {
        this.addLink(this.unifyLinkProtocol(value));
      }
    } else {
      this.form.controls[this.controlName].setErrors({ 'VALIDATOR.ERROR.PATTERN': true });
      this.formUtils.isFieldInvalid(this.form, this.controlName);
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
      this.emitItemsList();
    } else if (value.length > 0) {
      this.linksList.push({ link: value });
      this.emitItemsList();
    }
    this.clearInputValue();
  }

  public onDeleteClick(deleteItem: ILinkList): void {
    this.linksList = this.linksList.filter(item => item !== deleteItem);
    this.emitItemsList();
  }

  public isValueExist(value: string): boolean {
    return this.linksList.filter(item => item.link === value).length > 0;
  }

  private emitItemsList(): void {
    this.linksListUnify = this.linksList.map(map => map.link);
    this.linksListEmitter$.emit(this.linksListUnify);
  }

  private clearInputValue(): void {
    this.form.controls[this.controlName].setValue('');
  }

  private unifyLinkProtocol(value: string): string {
    return this.profileLinksComponentService.unifyLinkProtocol(value);
  }
}

// tslint:disable:readonly-array
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { CommonConfig } from '../../../../../common-config';
import { Config } from '../../../../../config';

interface IErrors {
  invalidMinCount: string;
  invalidMaxCount: string;
  invalidLength: string;
  invalidWordsCount: string;
  invalidPattern: string;
  duplicated: string;
}

@Component({
  selector: 'plat-input-tags',
  templateUrl: './input-tags.component.html',
  styleUrls: ['./input-tags.component.sass']
})
export class InputTagsComponent implements OnInit {

  public static readonly inputTagErrors: IErrors = {
    invalidMaxCount: 'invalidCount',
    invalidMinCount: 'invalidMinCount',
    invalidLength: 'invalidLength',
    invalidWordsCount: 'invalidWordsCount',
    invalidPattern: 'invalidPattern',
    duplicated: 'duplicated'
  };

  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public controlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public isRequired ? = false;

  @Input()
  public errorTrKey: string;

  @Input()
  public isDisabled ? = false;

  @Input()
  public onAddTagCallback: (inputValue: string) => void;

  @Input()
  public currentTagsCount: number;

  public isFocused = false;
  private readonly minValidTagsCount = CommonConfig.getCommonConfig().validation.consultation['tags-min-count'];

  constructor(public formUtils: FormUtilsService) {
  }

  public ngOnInit(): void {
    this.form.addControl(this.controlName, new FormControl('', this.getValidators()));
  }

  public isFieldInvalid = (): boolean =>
    this.formUtils.isFieldInvalid(this.form, this.controlName)

  public isRequiredError = (): boolean => {
    const controlNameErrors = this.form.controls[this.controlName].errors;

    if (controlNameErrors !== null) {
      return this.isFieldInvalid() && controlNameErrors.required;
    } else {
      return false;
    }
  }

  public onFocus = (): void => {
    this.isFocused = true;
  }

  public onBlur = (): void => {
    this.isFocused = false;
  }

  public onKeyUp = (event: KeyboardEvent, input: HTMLInputElement): void => {
    // tslint:disable-next-line:prefer-switch
    if (event.keyCode === Config.keyboardCodes.comma || event.keyCode === Config.keyboardCodes.commaASCI ||
      event.keyCode === Config.keyboardCodes.semicolon || event.keyCode === Config.keyboardCodes.enter) {
      this.handleNewTag(input);
    }
  }

  public handleNewTag = (input: HTMLInputElement): void => {
    const tag = input.value.trim();
    if (tag.indexOf(',') > -1 || tag.indexOf(';') > -1) {
      this.onAddTagCallback(tag.slice(0, -1));
    } else {
      this.onAddTagCallback(tag);
    }
    this.clearInputValue(input);
  }

  private getValidators = (): ValidatorFn[] =>
    this.getCustomValidator([])

  private getCustomValidator = (arr: ValidatorFn[]): ValidatorFn[] =>
    [...arr, this.validatorFn.bind(this)]

  private clearInputValue = (input: HTMLInputElement): void => {
    const errors = this.form.controls[this.controlName].errors;
    if (!this.isFieldInvalid() || errors && errors.invalidMinCount) {
      input.value = '';
    }
  }

  private validatorFn(_control: FormControl): { [key: string]: boolean } | null {
    if (this.currentTagsCount < this.minValidTagsCount ||
      this.currentTagsCount < this.minValidTagsCount - 1 && this.isFocused) {
      this.errorTrKey = 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_MIN_TAGS_COUNT';

      return {[InputTagsComponent.inputTagErrors.invalidMinCount]: true};
    } else {
      // tslint:disable-next-line:no-null-keyword
      return null;
    }
  }

}

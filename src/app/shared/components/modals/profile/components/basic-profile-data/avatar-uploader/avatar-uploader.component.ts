import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { AvatarSizeEnum } from '../../../../../user-avatar/user-avatar.component';

export const AVATAR_UPLOAD_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => AvatarUploaderComponent),
  multi: true,
};

export enum AvatarErrorEnum {
  TOO_LARGE,
  TOO_SMALL_DIMENSIONS,
  REQUIRED,
}
/**
 * Avatar uploader. Use as standard control in your form.
 * It can be used in Reactive forms and template driver forms
 * Internal validator:
 * If image size over is over threshold it is considered to be an error
 * and formControl will be marked as INVALID
 */
@Component({
  selector: 'plat-avatar-uploader',
  templateUrl: './avatar-uploader.component.html',
  styleUrls: ['./avatar-uploader.component.sass'],
  providers: [AVATAR_UPLOAD_ACCESSOR],
})
export class AvatarUploaderComponent implements ControlValueAccessor {
  @Input()
  public isOrganizationAvatar = false;

  @Input()
  public formControl: FormControl;

  @Input()
  public isDisabled = false;

  public readonly avatarSize = AvatarSizeEnum.X_156;
  public avatarErrorType: typeof AvatarErrorEnum = AvatarErrorEnum;

  public avatarToken: string;
  public isError = false;
  private onModelChange: (obj?: string) => void;
  // tslint:disable-next-line:no-any
  private onTouch: (obj?: any) => void;

  private readonly controlErrorCodes = {
    tooLarge: 'tooLarge',
    required: 'required',
    tooSmallDimensions: 'tooSmallDimensions',
  };

  public onClickClear(): void {
    this.onAvatarTokenChange('');
    /**
     * We need to markAsTouched to trigger required error
     */
    this.formControl.markAsTouched();
  }

  public onAvatarTokenChange(avatarToken: string): void {
    if (!this.isDisabled) {
      // tslint:disable-next-line:no-null-keyword
      this.formControl.setErrors(null);
      this.avatarToken = avatarToken;
      this.onModelChange(avatarToken);
    }
  }

  public writeValue(avatarToken: string): void {
    this.avatarToken = avatarToken;
  }

  // tslint:disable-next-line:no-any
  public registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  // tslint:disable-next-line:no-any
  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public get requiredError(): boolean {
    return this.formControl.touched && this.formControl.hasError(this.controlErrorCodes.required);
  }

  public get tooLargeError(): boolean {
    return this.formControl.hasError(this.controlErrorCodes.tooLarge);
  }

  public get tooSmallDimensionsError(): boolean {
    return this.formControl.hasError(this.controlErrorCodes.tooSmallDimensions);
  }

  public get fileUploadError(): boolean {
    return this.tooSmallDimensionsError || this.tooLargeError;
  }

  public onAvatarError(errorType: AvatarErrorEnum): void {
    switch (errorType) {
      case AvatarErrorEnum.TOO_LARGE:
        this.setError(this.controlErrorCodes.tooLarge);
        break;

      case AvatarErrorEnum.TOO_SMALL_DIMENSIONS:
        this.setError(this.controlErrorCodes.tooSmallDimensions);
        break;

      default:
        this.setError(this.controlErrorCodes.required);
    }
  }

  private setError(errorType: string): void {
    this.formControl.setErrors({ [errorType]: true });
  }
}

import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { AvatarSizeEnum } from '../../../../../user-avatar/user-avatar.component';

export const AVATAR_UPLOAD_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => AvatarUploaderComponent),
  multi: true,
};

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

  public readonly avatarSize = AvatarSizeEnum.X_156;

  public avatarToken: string;
  private onModelChange: (obj?: string) => void;
  // tslint:disable-next-line:no-any
  private onTouch: (obj?: any) => void;

  private readonly controlErrorCodes = {
    tooLarge: 'tooLarge',
    required: 'required',
  };

  public onAvatarTooLarge(): void {
    this.formControl.setErrors({ [this.controlErrorCodes.tooLarge]: false });
  }
  public onClickClear(): void {
    this.onAvatarTokenChange('');
  }
  public onAvatarTokenChange(avatarToken: string): void {
    // tslint:disable-next-line:no-null-keyword
    this.formControl.setErrors(null);
    this.avatarToken = avatarToken;
    this.onModelChange(avatarToken);
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
    return this.formControl.hasError(this.controlErrorCodes.required);
  }
  public get tooLargeError(): boolean {
    return this.formControl.hasError(this.controlErrorCodes.tooLarge);
  }
}

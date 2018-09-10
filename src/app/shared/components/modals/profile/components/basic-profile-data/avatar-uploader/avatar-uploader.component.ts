import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CreateProfileModalComponentService } from '../../../create-profile/create-profile.component.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { AvatarSizeEnum } from '../../../../../user-avatar/user-avatar.component';

@Component({
  selector: 'app-avatar-uploader',
  templateUrl: './avatar-uploader.component.html',
  styleUrls: ['./avatar-uploader.component.sass'],
})
export class AvatarUploaderComponent implements OnDestroy, OnInit {
  @Input()
  public avatarToken: string;

  @Input()
  public controlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public isRequired = false;

  @Input()
  public isOrganizationAvatar = false;

  public isError = false;
  public readonly avatarSize = AvatarSizeEnum.X_156;

  private logger: LoggerService;
  private destroyed$ = new Subject<void>();

  constructor(
    private formUtils: FormUtilsService,
    private alertService: AlertService,
    private createProfileModalComponentService: CreateProfileModalComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('AvatarUploaderComponent');
  }

  public ngOnInit(): void {
    this.form.addControl(this.controlName, new FormControl('', this.isRequired ? Validators.required.bind(this) : []));

    this.createProfileModalComponentService.avatarToken
      .pipe(
        catchError(err => of(this.handleGetPrevoiusUrlAvatarError(err))),
        takeUntil(this.destroyed$),
      )
      .subscribe((avatarToken: string) => {
        this.setAvatarToken(avatarToken);
      });
  }

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.form, this.controlName);

  public onError = (isError: boolean): void => {
    this.isError = isError;
  };

  public ngOnDestroy(): void {
    this.createProfileModalComponentService.setAvatarToken(this.form.controls[this.controlName].value);
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onClickClear = (): void => {
    this.isError = false;
    this.form.controls[this.controlName].setValue('');
    this.createProfileModalComponentService.setAvatarToken('');
  };

  private handleGetPrevoiusUrlAvatarError = (httpError: HttpErrorResponse): void => {
    this.logger.error('Error when handling previous avatar src', httpError);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
  };

  private setAvatarToken = (avatarToken: string): void => {
    this.avatarToken = avatarToken;
    this.form.controls[this.controlName].setValue(avatarToken);
  };
}

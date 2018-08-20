import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EditProfileModalComponentService } from '../../../edit-profile/edit-profile.component.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of } from 'rxjs/observable/of';
import { catchError, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AvatarSizeEnum } from '../../../../../user-avatar/user-avatar.component';

@Component({
  selector: 'app-avatar-uploader',
  templateUrl: './avatar-uploader.component.html',
  styleUrls: ['./avatar-uploader.component.sass'],
})
export class AvatarUploaderComponent implements OnDestroy, OnInit {
  @Input()
  public avatarUrl: string;

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

  private ngUnsubscribe = new Subject<string>();
  private logger: LoggerService;

  constructor(
    private formUtils: FormUtilsService,
    private alertService: AlertService,
    private editProfileModalComponentService: EditProfileModalComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('AvatarUploaderComponent');
  }

  public ngOnInit(): void {
    this.form.addControl(this.controlName, new FormControl('', this.isRequired ? Validators.required.bind(this) : []));

    this.editProfileModalComponentService
      .getPreviousAvatarSrc()
      .pipe(catchError(err => of(this.handleGetPrevoiusUrlAvatarError(err))))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((avatarSrc: string) => {
        this.setAvatarUrl(avatarSrc);
      });
  }

  public isFieldInvalid = (): boolean => this.formUtils.isFieldInvalid(this.form, this.controlName);

  public onError = (isError: boolean): void => {
    this.isError = isError;
  };

  public ngOnDestroy(): void {
    this.editProfileModalComponentService.getPreviousAvatarSrc().next(this.form.controls[this.controlName].value);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onClickClear = (): void => {
    this.isError = false;
    this.form.controls[this.controlName].setValue('');
    this.editProfileModalComponentService.getPreviousAvatarSrc().next('');
  };

  private handleGetPrevoiusUrlAvatarError = (httpError: HttpErrorResponse): void => {
    this.logger.error('Error when handling previous avatar src', httpError);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
  };

  private setAvatarUrl = (avatarSrc: string): void => {
    this.avatarUrl = avatarSrc;
    this.form.controls[this.controlName].setValue(avatarSrc);
  };
}

import {
  AfterContentInit,
  Component, Input, OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditProfileModalComponentService } from '../edit-profile.component.service';
import { Config } from '../../../../../../config';
import { catchError, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService, LoggerFactory, LoggerService  } from '@anymind-ng/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'plat-basic-profile-data',
  styleUrls: ['./basic-profile-data.component.sass'],
  templateUrl: './basic-profile-data.component.html'
})

export class BasicProfileDataComponent implements OnDestroy, AfterContentInit {

  @Input()
  public formGroup: FormGroup;

  @Input()
  public controlName: string;

  @Input()
  public isRequired?: boolean;

  public imageAvatar: string;

  public readonly profileNameMaxlength = Config.inputsLength.profileNameMaxlength;
  public readonly profileNameMinlength = Config.inputsLength.profileNameMinlength;
  public ngModel = '';
  private logger: LoggerService;
  private ngUnsubscribe = new Subject<string>();
  private ngUnsubscribeAvatarUrl = new Subject<string>();

  constructor(private editProfileModalComponentService: EditProfileModalComponentService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('BasicProfileDataComponent');
  }

  public ngAfterContentInit(): void {
    this.editProfileModalComponentService.getPreviousValue$()
      .pipe(catchError((err) => of(this.handleGetPrevoiusValueError(err))))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.setPreviousValue);

    this.editProfileModalComponentService.getPreviousAvatarSrc()
      .pipe(catchError((err) => of(this.handleGetPrevoiusUrlAvatarError(err))))
      .pipe(takeUntil(this.ngUnsubscribeAvatarUrl))
      .subscribe((avatarSrc: string) => this.imageAvatar = avatarSrc);
  }

  public ngOnDestroy(): void {
    this.editProfileModalComponentService.getPreviousValue$().next(this.formGroup.controls[this.controlName].value);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribeAvatarUrl.next();
    this.ngUnsubscribeAvatarUrl.complete();
  }

  private handleGetPrevoiusUrlAvatarError = (httpError: HttpErrorResponse): void => {
    this.logger.error('Error when handling previous avatar src', httpError);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
  }

  private handleGetPrevoiusValueError = (httpError: HttpErrorResponse): void => {
    this.logger.error('Error when handling previous value', httpError);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
  }

  private setPreviousValue = (value: string): string =>
    this.ngModel = value
}

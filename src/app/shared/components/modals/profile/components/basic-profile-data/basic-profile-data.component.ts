import {
  AfterContentInit,
  Component, Input, OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditProfileModalComponentService } from '../../edit-profile/edit-profile.component.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService, LoggerFactory, LoggerService  } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { Config } from '../../../../../../../config';

@Component({
  selector: 'plat-basic-profile-data',
  styleUrls: ['./basic-profile-data.component.sass'],
  templateUrl: './basic-profile-data.component.html'
})

export class BasicProfileDataComponent implements OnDestroy, AfterContentInit {

  @Input()
  public form: FormGroup;

  @Input()
  public profileNameControlName: string;

  @Input()
  public avatarControlName: string;

  @Input()
  public isRequired ? = false;

  @Input()
  public isDisabled ? = false;

  @Input()
  public isOrganizationAvatar = false;

  @Input()
  public inputTextLabel?: string;

  @Input()
  public inputTextPlaceholder?: string;

  @Input()
  public avatarUrl?: string;

  public readonly profileNameMaxlength = Config.inputsLength.profileNameMaxlength;
  public readonly profileNameMinlength = Config.inputsLength.profileNameMinlength;
  public profileNameNgModel = '';
  private logger: LoggerService;
  private ngUnsubscribe = new Subject<string>();

  constructor(private editProfileModalComponentService: EditProfileModalComponentService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('BasicProfileDataComponent');
  }

  public ngAfterContentInit(): void {
    this.editProfileModalComponentService.getPreviousValue$()
      .pipe(catchError((err) => of(this.handleGetPrevoiusValueError(err))))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.setPreviousUserNameValue);
  }

  public ngOnDestroy(): void {
    this.editProfileModalComponentService.getPreviousValue$()
      .next(this.form.controls[this.profileNameControlName].value);
    this.form.reset();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private handleGetPrevoiusValueError = (httpError: HttpErrorResponse): void => {
    this.logger.error('Error when handling previous value', httpError);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
  }

  private setPreviousUserNameValue = (value: string): void => {
    this.profileNameNgModel = value;
  }
}

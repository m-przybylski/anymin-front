import {
  AfterContentInit,
  Component, Input, OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalComponentEditProfileService } from '../edit-profile.component.service';
import { Config } from '../../../../../../config';
import { catchError, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs/Subject';

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

  public readonly profileNameMaxlength = Config.inputsLength.profileNameMaxlength;
  public readonly profileNameMinlength = Config.inputsLength.profileNameMinlength;
  public ngModel = '';
  private logger: LoggerService;
  private ngUnsubscribe = new Subject<string>();

  constructor(private modalComponentEditProfileService: ModalComponentEditProfileService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('BasicProfileDataComponent');
  }

  public ngAfterContentInit(): void {
    this.modalComponentEditProfileService.getPreviousValue$()
      .pipe(catchError((err) => of(this.handleGetPrevoiusValueError(err))))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.setPreviousValue);
  }

  public ngOnDestroy(): void {
    this.modalComponentEditProfileService.getPreviousValue$().next(this.formGroup.controls[this.controlName].value);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private handleGetPrevoiusValueError = (httpError: HttpErrorResponse): void => {
    this.logger.error('Error when handling previous value', httpError);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
  }

  private setPreviousValue = (value: string): string =>
    this.ngModel = value
}

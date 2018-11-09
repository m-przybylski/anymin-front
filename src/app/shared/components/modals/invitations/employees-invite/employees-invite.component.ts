import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { EmployeeInvitationTypeEnum, EmployeesInviteService } from './employees-invite.service';
import { ExpertProfileWithEmployments } from '@anymind-ng/api/model/expertProfileWithEmployments';
import { FormGroup } from '@angular/forms';
import { AvatarSizeEnum } from '../../../user-avatar/user-avatar.component';
import { Alerts, AlertService, Animations, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, Subject } from 'rxjs';
import { CommonSettingsService } from '../../../../../../angularjs/common/services/common-settings/common-settings.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PhoneNumberUnifyService } from '../../../../services/phone-number-unify/phone-number-unify.service';
import { PostInvitation } from '@anymind-ng/api';
import { BackendErrors, isBackendError, SingleBackendError } from '@platform/shared/models/backend-error/backend-error';

export interface IEmployeesInviteComponent {
  name: string;
  serviceId?: string;
  avatar?: string;
  employeeId?: string;
  email?: string;
  msisdn?: string;
  id?: string;
}

@Component({
  selector: 'plat-employees-invite',
  templateUrl: './employees-invite.component.html',
  styleUrls: ['./employees-invite.component.sass'],
  animations: Animations.addItemAnimation,
})
export class EmployeesInviteModalComponent implements OnInit, AfterViewInit {
  public readonly avatarSize = AvatarSizeEnum.X_24;
  public readonly emailPattern: RegExp;
  public inviteEmployeesFormGroupName = new FormGroup({});
  public readonly inviteEmployeesControlName = 'inviteEmployeesControl';
  public readonly csvControlName = 'csvControlName';
  public isDropdownListVisible = false;
  public invitedEmployeeList: ReadonlyArray<IEmployeesInviteComponent> = [];
  public filteredItems: ReadonlyArray<IEmployeesInviteComponent> = [];
  public isChangeOnSubmit = false;
  public serviceName = '';
  public usedContactList: ReadonlyArray<string> = [];

  @Input()
  public serviceId: string;

  @Output()
  public linksListEmitter$: EventEmitter<ReadonlyArray<string>> = new EventEmitter<ReadonlyArray<string>>();

  private dropdownItems: ReadonlyArray<IEmployeesInviteComponent> = [];
  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private alertService: AlertService,
    private employeesInviteService: EmployeesInviteService,
    private formUtils: FormUtilsService,
    private activeModal: NgbActiveModal,
    private phoneNumberUnifyService: PhoneNumberUnifyService,
    commonSettingsService: CommonSettingsService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('EmployeesInviteModalComponent');
    this.emailPattern = commonSettingsService.localSettings.emailPattern;
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.onModalContentChange().next(false);
  }

  public ngOnInit(): void {
    this.employeesInviteService.mapEmployeeList(this.serviceId).subscribe(res => {
      this.dropdownItems = res.employeeList;
      this.usedContactList = res.pendingInvitations.invitations;
    });

    this.employeesInviteService
      .getConsultationDetails(this.serviceId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(serviceDetails => (this.serviceName = serviceDetails.name));
  }

  public onClickSend = (formGroup: FormGroup): void => {
    if (this.invitedEmployeeList.length !== 0 && formGroup.valid) {
      this.employeesInviteService
        .postInvitation({ invitations: [...this.adjustEmployeeInvitationObject()] })
        .pipe(
          takeUntil(this.ngUnsubscribe$),
          catchError(err => this.handleGetEmployeeListError(err, 'Can no send invitations')),
        )
        .subscribe(response => {
          this.alertService.pushSuccessAlert('INVITE_EMPLOYEES.ALERT.SUCCESS');
          this.activeModal.close(response);
        });
    }
  };

  public onEnter = (value: string): void =>
    !this.isDropdownListVisible
      ? this.addEmployeeInvitationByType(
          this.employeesInviteService.checkInvitationType(value.toLowerCase()),
          value.toLowerCase(),
        )
      : void 0;

  public onCSVupload = (employeesContact: ReadonlyArray<string>): void => {
    employeesContact.forEach(value => {
      this.addEmployeeInvitationByType(this.employeesInviteService.checkInvitationType(value), value);
    });
  };

  public onSelectItem = (expertProfile: IEmployeesInviteComponent): void => {
    this.addEmployee(expertProfile);
    this.filterOwnEmployeesDropdownList(expertProfile);
    this.isDropdownListVisible = false;
  };

  public onInputChangeValue = (value: string): void => {
    this.filterItem(value);
    this.isDropdownListVisible = value !== '' && this.filteredItems.length > 0;
  };

  public onCloseDrodpown = (isOpen: boolean): boolean => (this.isDropdownListVisible = isOpen);

  public onDeleteClick = (deleteItem: IEmployeesInviteComponent): void => {
    this.invitedEmployeeList = this.invitedEmployeeList.filter(item => item !== deleteItem);
    this.usedContactList = this.usedContactList.filter(item => item !== deleteItem.name);

    if (deleteItem.employeeId !== undefined) {
      this.dropdownItems = [...this.dropdownItems, deleteItem];
    }
  };

  // tslint:disable-next-line:cyclomatic-complexity
  private addEmployeeInvitationByType = (invitationType: EmployeeInvitationTypeEnum, value: string): void => {
    switch (invitationType) {
      case EmployeeInvitationTypeEnum.IS_MSIDN:
        const unifyPhoneNumber = this.phoneNumberUnifyService.unifyPhoneNumber(value);
        const prettyPhoneNumber = this.phoneNumberUnifyService.getPrettyPhoneNumber(value);
        this.addEmployee({ serviceId: this.serviceId, name: prettyPhoneNumber, msisdn: unifyPhoneNumber });
        break;

      case EmployeeInvitationTypeEnum.IS_EMAIL:
        this.addEmployee({ serviceId: this.serviceId, name: value, email: value });
        break;

      case EmployeeInvitationTypeEnum.IS_PENDING:
        this.setEmployeesInvitationError({ 'INVITE_EMPLOYEES.ERROR.VALUE_EXIST': true });
        break;

      case EmployeeInvitationTypeEnum.INVALID:
        this.setEmployeesInvitationError({ 'INVITE_EMPLOYEES.ERROR.INCORRECT_VALUE': true });
        break;

      case EmployeeInvitationTypeEnum.IS_ALREADY_ADDED:
        this.setEmployeesInvitationError({ 'INVITE_EMPLOYEES.ERROR.VALUE_ADDED': true });
        break;

      case EmployeeInvitationTypeEnum.MAX_LENGTH_REACHED:
        this.setEmployeesInvitationError({ 'INVITE_EMPLOYEES.ERROR.LIMIT_REACHED': true });
        break;

      default:
        return;
    }
  };

  private setEmployeesInvitationError = (errorMsg: { [key: string]: boolean }): void => {
    this.inviteEmployeesFormGroupName.controls[this.inviteEmployeesControlName].setErrors(errorMsg);
    this.formUtils.isFieldInvalid(this.inviteEmployeesFormGroupName, this.inviteEmployeesControlName);
  };

  private adjustEmployeeInvitationObject = (): ReadonlyArray<PostInvitation> =>
    this.invitedEmployeeList.map(item => ({
      serviceId: this.serviceId,
      email: item.email,
      msisdn: item.msisdn,
      employeeId: item.employeeId,
    }));

  private addEmployee = (expertProfile: IEmployeesInviteComponent): void => {
    if (!this.isValueExist(expertProfile.name)) {
      this.invitedEmployeeList = [...this.invitedEmployeeList, expertProfile];
      this.usedContactList = [...this.usedContactList, expertProfile.name];
      this.employeesInviteService.setInvitedEmployeeList(this.invitedEmployeeList);
      this.inviteEmployeesFormGroupName.controls[this.inviteEmployeesControlName].setValue('');
    } else {
      this.addEmployeeInvitationByType(EmployeeInvitationTypeEnum.IS_ALREADY_ADDED, expertProfile.name);
    }
  };

  private filterItem = (value: string): ReadonlyArray<IEmployeesInviteComponent> =>
    (this.filteredItems = this.dropdownItems.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1));

  private filterOwnEmployeesDropdownList = (
    expertProfile: IEmployeesInviteComponent,
  ): ReadonlyArray<IEmployeesInviteComponent> =>
    (this.dropdownItems = this.dropdownItems.filter(item => item !== expertProfile));

  private isValueExist = (value: string): boolean =>
    this.invitedEmployeeList.filter(item => item.name === value).length > 0;

  private handleGetEmployeeListError = (
    httpError: HttpErrorResponse,
    msg: string,
  ): Observable<ReadonlyArray<ExpertProfileWithEmployments>> => {
    if (isBackendError(httpError.error) && httpError.error.code === BackendErrors.IncorrectValidation) {
      this.invitedEmployeeList = this.invitedEmployeeList.filter(
        invitedEmployee =>
          !httpError.error.errors
            .map((error: SingleBackendError) => error.message)
            .some((message: string) => invitedEmployee.msisdn && message.includes(invitedEmployee.msisdn)),
      );

      this.alertService.pushDangerAlert('INVITE_EMPLOYEES.SOME_INVALID_NUMBERS_VALIDATION');
    } else {
      this.logger.warn(msg, httpError);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }

    return EMPTY;
  };
}

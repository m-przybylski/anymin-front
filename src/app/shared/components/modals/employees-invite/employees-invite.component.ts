// tslint:disable:readonly-array

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { EmployeeInvitationTypeEnum, EmployeesInviteService } from './employees-invite.service';
import { ExpertProfileWithEmployments } from '@anymind-ng/api/model/expertProfileWithEmployments';
import { FormGroup } from '@angular/forms';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Alerts, AlertService, Animations, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError, takeUntil } from 'rxjs/internal/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, Subject } from 'rxjs/index';
import { CommonSettingsService } from '../../../../../angularjs/common/services/common-settings/common-settings.service';
import { PostInvitation } from '@anymind-ng/api/model/postInvitation';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface IEmployeesInviteComponent {
  name: string;
  serviceId?: string;
  avatar?: string;
  employeeId?: string;
  email?: string;
  msisdn?: string;
}

@Component({
  selector: 'plat-employees-invite',
  templateUrl: './employees-invite.component.html',
  styleUrls: ['./employees-invite.component.sass'],
  animations: Animations.addItemAnimation,
  providers: [EmployeesInviteService],
})
export class EmployeesInviteModalComponent implements OnInit, AfterViewInit {
  public readonly avatarSize = AvatarSizeEnum.X_24;
  public emailPattern: RegExp;
  public inviteEmployeesFormGroupName = new FormGroup({});
  public inviteEmployeesControlName = 'inviteEmployeesControl';
  public isDropdownListVisible = false;
  public invitedEmployeeList: IEmployeesInviteComponent[] = [];
  public filteredItems: IEmployeesInviteComponent[] = [];
  public isChangeOnSubmit = false;
  public serviceName = '';

  @Input() public serviceId: string;

  @Output() public linksListEmitter$: EventEmitter<string[]> = new EventEmitter<string[]>();

  private dropdownItems: IEmployeesInviteComponent[] = [];
  private employeesConsultationList: IEmployeesInviteComponent[] = [];
  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private alertService: AlertService,
    private employeesInviteService: EmployeesInviteService,
    private formUtils: FormUtilsService,
    private activeModal: NgbActiveModal,
    commonSettingsService: CommonSettingsService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('EmployeesInviteModalComponent');
    this.emailPattern = commonSettingsService.localSettings.emailPattern;
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.isPendingRequest().next(false);
  }

  public ngOnInit(): void {
    this.employeesInviteService
      .getEmployeeList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(catchError(err => this.handleGetEmployeeListError(err, 'Can not get employees list')))
      .subscribe(response => {
        this.dropdownItems = response.filter(item => item.employments[0]).map(employeeProfile => ({
          name: employeeProfile.expertProfile.name,
          avatar: employeeProfile.expertProfile.avatar,
          employeeId: employeeProfile.employments[0].id,
          serviceId: employeeProfile.employments[0].serviceId,
        }));

        this.employeesConsultationList = this.dropdownItems.filter(employee => employee.serviceId === this.serviceId);
        this.employeesConsultationList.forEach(item => {
          this.filterOwnEmployeesDropdownList(item);
        });
      });

    this.employeesInviteService
      .getConsultationDetails(this.serviceId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(serviceDetails => (this.serviceName = serviceDetails.name));

    this.employeesInviteService.checkPendingInvitations(this.serviceId);
  }

  public onClickSend = (formGroup: FormGroup): void => {
    if (this.invitedEmployeeList.length !== 0 && formGroup.valid) {
      this.employeesInviteService
        .postInvitation({ invitations: this.adjustEmployeeInvitationObject() })
        .pipe(takeUntil(this.ngUnsubscribe$))
        .pipe(catchError(err => this.handleGetEmployeeListError(err, 'Can no send invitations')))
        .subscribe(() => {
          this.alertService.pushSuccessAlert('INVITE_EMPLOYEES.ALERT.SUCCESS');
          this.activeModal.close(true);
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
    if (deleteItem.employeeId !== undefined) {
      this.dropdownItems.push(deleteItem);
    }
  };

  private addEmployeeInvitationByType = (invitationType: EmployeeInvitationTypeEnum, value: string): void => {
    switch (invitationType) {
      case EmployeeInvitationTypeEnum.IS_MSIDN:
        this.addEmployee({ serviceId: this.serviceId, name: value, msisdn: `+48${value}` });
        break;

      case EmployeeInvitationTypeEnum.IS_EMAIL:
        this.addEmployee({ serviceId: this.serviceId, name: value, email: value });
        break;

      case EmployeeInvitationTypeEnum.IS_PENDING:
        this.inviteEmployeesFormGroupName.controls[this.inviteEmployeesControlName].setErrors({
          'INVITE_EMPLOYEES.ERROR.VALUE_EXIST': true,
        });
        this.formUtils.isFieldInvalid(this.inviteEmployeesFormGroupName, this.inviteEmployeesControlName);
        break;

      case EmployeeInvitationTypeEnum.INVALID:
        this.inviteEmployeesFormGroupName.controls[this.inviteEmployeesControlName].setErrors({
          'INVITE_EMPLOYEES.ERROR.INCORRECT_VALUE': true,
        });
        this.formUtils.isFieldInvalid(this.inviteEmployeesFormGroupName, this.inviteEmployeesControlName);
        break;

      case EmployeeInvitationTypeEnum.IS_ALREADY_ADDED:
        this.inviteEmployeesFormGroupName.controls[this.inviteEmployeesControlName].setErrors({
          'INVITE_EMPLOYEES.ERROR.VALUE_ADDED': true,
        });
        this.formUtils.isFieldInvalid(this.inviteEmployeesFormGroupName, this.inviteEmployeesControlName);
        break;

      default:
        return;
    }
  };

  private adjustEmployeeInvitationObject = (): PostInvitation[] =>
    this.invitedEmployeeList.map(item => ({
      serviceId: this.serviceId,
      email: item.email,
      msisdn: item.msisdn,
      employeeId: item.employeeId,
    }));

  private addEmployee = (expertProfile: IEmployeesInviteComponent): void => {
    if (!this.isValueExist(expertProfile.name)) {
      this.invitedEmployeeList = [...this.invitedEmployeeList, expertProfile];
      this.inviteEmployeesFormGroupName.controls[this.inviteEmployeesControlName].setValue('');
    } else {
      this.addEmployeeInvitationByType(EmployeeInvitationTypeEnum.IS_ALREADY_ADDED, expertProfile.name);
    }
  };

  private filterItem = (value: string): IEmployeesInviteComponent[] =>
    (this.filteredItems = this.dropdownItems.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1));

  private filterOwnEmployeesDropdownList = (expertProfile: IEmployeesInviteComponent): IEmployeesInviteComponent[] =>
    (this.dropdownItems = this.dropdownItems.filter(item => item !== expertProfile));

  private isValueExist = (value: string): boolean =>
    this.invitedEmployeeList.filter(item => item.name === value).length > 0;

  private handleGetEmployeeListError = (
    error: HttpErrorResponse,
    msg: string,
  ): Observable<ExpertProfileWithEmployments[]> => {
    this.logger.warn(msg, error);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return EMPTY;
  };
}

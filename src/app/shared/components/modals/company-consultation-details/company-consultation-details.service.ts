import { Injectable } from '@angular/core';
import { EmploymentService, GetInvitation, InvitationService, ProfileService, ServiceService } from '@anymind-ng/api';
import { Observable } from 'rxjs/Observable';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { map, switchMap } from 'rxjs/operators';
import { GetService } from '@anymind-ng/api/model/getService';
import { GetServiceWithInvitations } from '@anymind-ng/api/model/getServiceWithInvitations';
import { forkJoin, iif, of } from 'rxjs';
import { ICompanyEmployeeRowComponent } from '@platform/shared/components/modals/company-consultation-details/company-employee-row/company-employee-row.component';
import { EmploymentWithExpertProfile } from '@anymind-ng/api/model/employmentWithExpertProfile';

export interface ICompanyProfileDetails {
  consultationDetails: GetService;
  profileDetails: GetProfileWithDocuments;
}

interface ICompanyConsultationDetails {
  tagsList: ReadonlyArray<string>;
  serviceDetails: ICompanyProfileDetails;
  employeesList: ReadonlyArray<ICompanyEmployeeRowComponent>;
}

@Injectable()
export class CompanyConsultationDetailsViewService {
  constructor(
    private serviceService: ServiceService,
    private employmentService: EmploymentService,
    private invitationService: InvitationService,
    private profileService: ProfileService,
  ) {}

  public getConsultationDetails = (serviceId: string): Observable<ICompanyConsultationDetails> =>
    forkJoin(
      this.serviceService
        .postServicesTagsRoute({ serviceIds: [serviceId] })
        .pipe(
          map(getServiceTagsList =>
            getServiceTagsList
              .filter(getServiceTag => getServiceTag.serviceId === serviceId)
              .reduce((tagsList, getServiceTags) => [...tagsList, ...getServiceTags.tags.map(tag => tag.name)], []),
          ),
        ),
      this.serviceService
        .getServiceRoute(serviceId)
        .pipe(
          switchMap(
            (consultationDetails): Observable<ICompanyProfileDetails> =>
              this.profileService
                .getProfileRoute(consultationDetails.ownerId)
                .pipe(map(profileDetails => ({ consultationDetails, profileDetails }))),
          ),
        ),
      this.serviceService
        .postServiceWithEmployeesRoute({ serviceIds: [serviceId] })
        .pipe(map(response => response[0].employeesDetails.map(employee => this.assignEmployeesList(employee)))),
    ).pipe(
      map(
        ([tagsList, serviceDetails, employeesList]: [
          ReadonlyArray<string>,
          ICompanyProfileDetails,
          ReadonlyArray<ICompanyEmployeeRowComponent>
        ]): ICompanyConsultationDetails => ({
          tagsList,
          serviceDetails,
          employeesList,
        }),
      ),
    );

  public deletePendingInvitation = (inviationId: string): Observable<void> =>
    this.invitationService.deleteInvitationsRoute({ invitationsIds: [inviationId] });

  public deleteEmployee = (employeementId: string): Observable<void> =>
    this.employmentService.deleteEmploymentRoute(employeementId);

  public getInvitations = (consultationId: string): Observable<ReadonlyArray<ICompanyEmployeeRowComponent>> =>
    this.getPendingInvitation(consultationId).pipe(
      map(serviceWithInvitations => serviceWithInvitations[0].invitations),
      map((invitations: ReadonlyArray<GetInvitation>) =>
        invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW),
      ),
      switchMap(invitations => {
        const employees = invitations.filter(item => item.employeeId);
        const pendingInvitations = invitations.filter(item => typeof item.employeeId === 'undefined').map(item => ({
          name: item.msisdn || item.email || '',
          id: item.id,
        }));

        return iif(
          () => employees.length > 0,
          forkJoin(
            employees.map(employee =>
              this.profileService.getProfileRoute(employee.employeeId as string).pipe(
                map(
                  (res: GetProfileWithDocuments): ICompanyEmployeeRowComponent => ({
                    name: res.profile.expertDetails ? res.profile.expertDetails.name : '',
                    id: res.profile.id,
                    avatar: res.profile.expertDetails ? res.profile.expertDetails.avatar : '',
                    employeeId: employee.id,
                  }),
                ),
              ),
            ),
          ),
          of([]),
        ).pipe(
          map(
            (
              employeeInvitations: ReadonlyArray<ICompanyEmployeeRowComponent>,
            ): ReadonlyArray<ICompanyEmployeeRowComponent> => [...employeeInvitations, ...pendingInvitations],
          ),
        );
      }),
    );

  private assignEmployeesList = (employee: EmploymentWithExpertProfile): ICompanyEmployeeRowComponent => ({
    usageCounter: employee.usageCounter,
    commentCounter: employee.commentCounter,
    ratingCounter: employee.rating,
    id: employee.id,
    name: employee.employeeProfile.name,
    avatar: employee.employeeProfile.avatar,
    employeeId: employee.employeeProfile.id,
  });

  private getPendingInvitation = (serviceId: string): Observable<ReadonlyArray<GetServiceWithInvitations>> =>
    this.serviceService.postServiceInvitationsRoute({ serviceIds: [serviceId] });
}

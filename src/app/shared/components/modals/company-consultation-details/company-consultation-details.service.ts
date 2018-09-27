import { Injectable } from '@angular/core';
import { EmploymentService, InvitationService, ProfileService, ServiceService } from '@anymind-ng/api';
import { Observable } from 'rxjs/Observable';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { map, switchMap } from 'rxjs/operators';
import { GetService } from '@anymind-ng/api/model/getService';
import { GetServiceWithEmployees } from '@anymind-ng/api/model/getServiceWithEmployees';
import { GetServiceWithInvitations } from '@anymind-ng/api/model/getServiceWithInvitations';

export interface ICompanyConsultationDetails {
  consultationDetails: GetService;
  profileDetails: GetProfileWithDocuments;
}

@Injectable()
export class CompanyConsultationDetailsViewService {
  constructor(
    private serviceService: ServiceService,
    private employmentService: EmploymentService,
    private invitationService: InvitationService,
    private profileService: ProfileService,
  ) {}

  public getServiceDetails = (serviceId: string): Observable<ICompanyConsultationDetails> =>
    this.serviceService
      .getServiceRoute(serviceId)
      .pipe(
        switchMap(
          (consultationDetails): any =>
            this.profileService
              .getProfileRoute(consultationDetails.ownerId)
              .pipe(map(profileDetails => ({ consultationDetails, profileDetails }))),
        ),
      );

  public getEmployeesList = (serviceIds: string): Observable<ReadonlyArray<GetServiceWithEmployees>> =>
    this.serviceService.postServiceWithEmployeesRoute({ serviceIds: [serviceIds] });

  public getPendingInvitation = (serviceId: string): Observable<ReadonlyArray<GetServiceWithInvitations>> =>
    this.serviceService.postServiceInvitationsRoute({ serviceIds: [serviceId] });

  public deletePendingInvitation = (inviationId: string): Observable<void> =>
    this.invitationService.deleteInvitationsRoute({ invitationsIds: [inviationId] }).pipe(map(res => res));

  public deleteEmployee = (employeementId: string): Observable<void> =>
    this.employmentService.deleteEmploymentRoute(employeementId).pipe(map(res => res));
}

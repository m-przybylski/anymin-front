import { Injectable } from '@angular/core';
import { EmploymentService, ProfileService, ServiceService, ViewsService } from '@anymind-ng/api';
import { GetService } from '@anymind-ng/api/model/getService';
import { Observable, forkJoin } from 'rxjs';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { ExpertProfileView } from '@anymind-ng/api/model/expertProfileView';
import { GetComment } from '@anymind-ng/api/model/getComment';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class ConsultationDetailsViewService {
  constructor(
    private serviceService: ServiceService,
    private profileService: ProfileService,
    private viewsService: ViewsService,
    private employmentService: EmploymentService,
  ) {}

  public getServiceDetails = (serviceId: string, employeeId: string): Observable<IConsultationDetails> =>
    this.serviceService.getServiceRoute(serviceId).pipe(
      switchMap(getService =>
        forkJoin(
          this.profileService.getProfileRoute(getService.ownerId),
          this.viewsService.getWebExpertProfileRoute(employeeId),
        ).pipe(
          map(
            ([expertDetails, expertProfileViewDetails]: [
              GetProfileWithDocuments,
              ExpertProfileView
            ]): IConsultationDetails => ({
              expertDetails,
              expertProfileViewDetails,
              getService,
            }),
          ),
        ),
      ),
    );

  public getServicesTagList = (serviceId: string): Observable<ReadonlyArray<string>> =>
    this.serviceService
      .postServicesTagsRoute({ serviceIds: [serviceId] })
      .pipe(
        map(getServiceTagsList =>
          getServiceTagsList
            .filter(getServiceTag => getServiceTag.serviceId === serviceId)
            .reduce((tagsList, getServiceTags) => [...tagsList, ...getServiceTags.tags.map(tag => tag.name)], []),
        ),
      );

  public getComments = (employementId: string, limit = '3', offset = '0'): Observable<ReadonlyArray<GetComment>> =>
    this.employmentService.getEmploymentCommentsRoute(employementId, limit, offset);

  public addTemporaryComment = (
    commentsList: GetComment,
    commentsConsultation: ReadonlyArray<GetComment>,
  ): ReadonlyArray<GetComment> => {
    const commentsList_first_part = commentsConsultation.slice(0, commentsConsultation.indexOf(commentsList));
    const commentsList_changed_element = commentsConsultation.slice(
      commentsConsultation.indexOf(commentsList),
      commentsConsultation.indexOf(commentsList) + 1,
    );
    const commentsList_second_part = commentsConsultation.slice(
      commentsConsultation.indexOf(commentsList) + 1,
      commentsConsultation.length,
    );

    return [...commentsList_first_part, ...commentsList_changed_element, ...commentsList_second_part];
  };

  public loadMoreComments = (
    commentsList: ReadonlyArray<GetComment>,
    commentsConsultation: ReadonlyArray<GetComment>,
  ): ReadonlyArray<GetComment> => [...commentsConsultation, ...commentsList];
}

export interface IConsultationDetails {
  expertDetails: GetProfileWithDocuments;
  expertProfileViewDetails: ExpertProfileView;
  getService: GetService;
}

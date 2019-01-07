import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { InvitationService, GetInvitation, ProfileService, GetOrganizationDetails } from '@anymind-ng/api';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class InvitationListResolverService implements Resolve<ReadonlyArray<IInvitation>> {
  constructor(private invitationService: InvitationService, private profileService: ProfileService) {}
  public resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<ReadonlyArray<IInvitation>> {
    return this.concatProfiles(this.invitationService.getInvitationsRoute()).pipe(
      this.mapInvitationToList,
      map(this.sortByDate),
    );
  }

  /**
   * Function groups service owners and make only necessery calls to API
   * to retrive profiles.
   *
   * @param invitations$ stream with list of invitarions
   * @return list of inviations with additional information from profile
   */
  private concatProfiles = (invitations$: Observable<ReadonlyArray<GetInvitation>>): Observable<IInvitationMap> =>
    invitations$.pipe(
      switchMap(invitations => {
        const filteredInvitations = this.filterByNewStatus(invitations);

        return this.getProfiles(this.reduceInvitationsToServiceOwnerIdList(filteredInvitations)).pipe(
          map(profilesList => ({
            invitations: filteredInvitations,
            profilesList,
          })),
        );
      }),
    );

  /**
   * Remove duplacated serviceOwnersId from invitations
   * @param invitations list of invitations
   * @return list of owner service is without duplicates
   */
  private reduceInvitationsToServiceOwnerIdList = (invitations: ReadonlyArray<GetInvitation>): ReadonlyArray<string> =>
    invitations.reduce<ReadonlyArray<string>>(
      (serviceOwnerIdList, invite) =>
        serviceOwnerIdList.includes(invite.serviceOwnerId)
          ? [...serviceOwnerIdList]
          : [...serviceOwnerIdList, invite.serviceOwnerId],
      [],
    );

  /**
   * Function makes concurent calls to API to retrieve list of profiles.
   * If backend does not return organization details item is ommited.
   */
  private getProfiles = (profilesId: ReadonlyArray<string>): Observable<Map<string, GetOrganizationDetails>> => {
    /**
     * forkJoin once received empty array completes the stream
     * required to pass empty array down the stream when no profiles to fetch
     */
    const profiles$ = profilesId.length
      ? forkJoin(profilesId.map(profileId => this.profileService.getProfileRoute(profileId)))
      : of([]);

    return profiles$.pipe(
      map(
        profilesList =>
          new Map(
            profilesList
              .filter(profile => typeof profile.profile.organizationDetails !== 'undefined')
              .map(
                (profile): [string, GetOrganizationDetails] => [
                  profile.profile.id,
                  profile.profile.organizationDetails as GetOrganizationDetails,
                ],
              ),
          ),
      ),
    );
  };
  /**
   * Maper function to blend array of invitations and map of profiles
   * into single array.
   */
  private mapInvitationToList = (invitationsMap$: Observable<IInvitationMap>): Observable<ReadonlyArray<IInvitation>> =>
    invitationsMap$.pipe(
      map(invitationsMap =>
        invitationsMap.invitations.map(invitation => {
          const serviceOwner = invitationsMap.profilesList.get(invitation.serviceOwnerId);

          return {
            id: invitation.id,
            inviteDate: new Date(invitation.createdAt),
            serviceId: invitation.serviceId,
            serviceName: invitation.serviceName,
            serviceOwnerName: serviceOwner ? serviceOwner.name : '',
            serviceOwnerAvatarToken: serviceOwner ? serviceOwner.logo : '',
            invitationStatus: invitation.status,
            isVisited: typeof invitation.displayedAt !== 'undefined',
          };
        }),
      ),
    );

  /**
   * Sorts array by date in ascending order without mutating original array
   */
  private sortByDate = (invitations: ReadonlyArray<IInvitation>): ReadonlyArray<IInvitation> =>
    invitations
      .slice()
      .sort((left: IInvitation, right: IInvitation) => right.inviteDate.getTime() - left.inviteDate.getTime());
  /**
   * Filter invitation by status only new
   */
  private filterByNewStatus = (invitations: ReadonlyArray<GetInvitation>): ReadonlyArray<GetInvitation> =>
    invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW);
}

interface IInvitationMap {
  invitations: ReadonlyArray<GetInvitation>;
  profilesList: Map<string, GetOrganizationDetails>;
}

export interface IInvitation {
  id: string;
  inviteDate: Date;
  serviceId: string;
  serviceName: string;
  serviceOwnerName: string;
  serviceOwnerAvatarToken: string;
  invitationStatus: GetInvitation.StatusEnum;
  isVisited?: boolean;
}

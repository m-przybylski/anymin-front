import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { InvitationService, GetInvitation, ProfileService, GetOrganizationDetails } from '@anymind-ng/api';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class InvitationListResolverService implements Resolve<ReadonlyArray<IInvitationList>> {
  constructor(private invitationService: InvitationService, private profileService: ProfileService) {}
  public resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<ReadonlyArray<IInvitationList>> {
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
   * Function makes concurent calls to API to retrive list of profiles.
   * If backend does not return organization details item is ommited.
   */
  private getProfiles = (profilesId: ReadonlyArray<string>): Observable<Map<string, GetOrganizationDetails>> =>
    forkJoin(profilesId.map(profileId => this.profileService.getProfileRoute(profileId))).pipe(
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
  /**
   * Maper function to blend array of invitations and map of profiles
   * into single array.
   */
  private mapInvitationToList = (
    invitationsMap$: Observable<IInvitationMap>,
  ): Observable<ReadonlyArray<IInvitationList>> =>
    invitationsMap$.pipe(
      map(invitationsMap =>
        invitationsMap.invitations.map(invitation => {
          const serviceOwner = invitationsMap.profilesList.get(invitation.serviceOwnerId);

          return {
            inviteDate: new Date(invitation.createdAt),
            serviceName: invitation.serviceName,
            serviceOwnerName: serviceOwner ? serviceOwner.name : '',
            serviceOwnerAvatarToken: serviceOwner ? serviceOwner.logo : '',
            invitationStatus: invitation.status,
            // TODO when backend ready.
            isVisited: false,
          };
        }),
      ),
    );

  /**
   * Filter invitation by status only new
   */
  private filterByNewStatus = (invitations: ReadonlyArray<GetInvitation>): ReadonlyArray<GetInvitation> =>
    invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW);
  /**
   * Sorts array by date in ascending order without mutating original array
   */
  private sortByDate = (invitations: ReadonlyArray<IInvitationList>): ReadonlyArray<IInvitationList> =>
    invitations
      .slice()
      .sort((left: IInvitationList, right: IInvitationList) => right.inviteDate.getTime() - left.inviteDate.getTime());
}

interface IInvitationMap {
  invitations: ReadonlyArray<GetInvitation>;
  profilesList: Map<string, GetOrganizationDetails>;
}

export interface IInvitationList {
  inviteDate: Date;
  serviceName: string;
  serviceOwnerName: string;
  serviceOwnerAvatarToken: string;
  invitationStatus: GetInvitation.StatusEnum;
  isVisited?: boolean;
}

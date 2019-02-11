import { GetProfileWithDocuments, InvitationService, PostProfileDetails, ProfileService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { of } from 'rxjs';
import { InvitationListResolverService } from './invitation-list.resolver.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { fakeAsync, tick } from '@angular/core/testing';
import ProfileTypeEnum = PostProfileDetails.ProfileTypeEnum;

// tslint:disable:max-line-length
// tslint:disable:max-file-line-count
export const invitationsMock: ReadonlyArray<any> = [
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    email: 'maciej.przybylski@anymind.com',
    status: 'NEW',
    createdAt: new Date('2018-08-27T08:02:42.409Z'),
    updatedAt: '2018-08-27T08:02:42.409Z',
  },
  {
    id: '473e64f2-3540-4925-bf54-dfe4ea4bfd15',
    serviceId: '75d15bc1-0520-43af-9180-b538e5e4f8f3',
    serviceName: 'JUPI',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    msisdn: '+48607508372',
    status: 'NEW',
    createdAt: new Date('2018-08-26T11:55:44.119Z'),
    updatedAt: '2018-08-26T11:55:44.119Z',
  },
];
export const invitationsMock2: ReadonlyArray<any> = [
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    email: 'maciej.przybylski@anymind.com',
    status: 'NEW',
    createdAt: new Date('2018-08-27T08:02:42.409Z'),
    updatedAt: '2018-08-27T08:02:42.409Z',
  },
  {
    id: '473e64f2-3540-4925-bf54-dfe4ea4bfd15',
    serviceId: '75d15bc1-0520-43af-9180-b538e5e4f8f3',
    serviceName: 'JUPI',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f2',
    msisdn: '+48607508372',
    status: 'NEW',
    createdAt: new Date('2018-08-31T11:55:44.119Z'),
    updatedAt: '2018-08-31T11:55:44.119Z',
  },
];
export const invitationsMock3: ReadonlyArray<any> = [
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f1',
    email: 'maciej.przybylski@anymind.com',
    status: 'NEW',
    createdAt: new Date('2018-08-27T08:02:42.409Z'),
    updatedAt: '2018-08-27T08:02:42.409Z',
  },
];
export const invitationsMock4: ReadonlyArray<any> = [
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'NEW',
    createdAt: new Date('2018-08-26T08:02:45.409Z'),
  },
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'NEW',
    createdAt: new Date('2018-08-27T08:02:42.409Z'),
  },
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'NEW',
    createdAt: new Date('2018-09-12T08:02:42.409Z'),
  },
];

export const invitationsMock5: ReadonlyArray<any> = [
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'NEW',
    createdAt: new Date('2018-08-26T08:02:45.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'ACCEPTED',
    createdAt: new Date('2018-08-27T08:02:42.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'REJECTED',
    createdAt: new Date('2018-09-12T08:02:42.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'NEW',
    createdAt: new Date('2018-09-12T08:02:42.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'DELETED',
    createdAt: new Date('2018-09-12T08:02:42.409Z'),
  },
];

export const invitationsMock6: ReadonlyArray<any> = [
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'DELETED',
    createdAt: new Date('2018-08-26T08:02:45.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'ACCEPTED',
    createdAt: new Date('2018-08-27T08:02:42.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'REJECTED',
    createdAt: new Date('2018-09-12T08:02:42.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'ACCEPTED',
    createdAt: new Date('2018-09-12T08:02:42.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'DELETED',
    createdAt: new Date('2018-09-12T08:02:42.409Z'),
  },
];

export const profileMap = new Map<string, GetProfileWithDocuments>([
  [
    'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    {
      profile: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        accountId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        isActive: true,
        profileType: ProfileTypeEnum.ORG,
        name: 'Salta ,salta',
        avatar: '3759ae044d9e400591d104e254c58f89',
        description:
          'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
        links: [],
      },
      documents: [],
    },
  ],
  [
    'c3d262b0-48d7-41b5-9aeb-9f59affdd0f2',
    {
      profile: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        accountId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        profileType: ProfileTypeEnum.ORG,
        isActive: true,
        name: 'Salta ,salta',
        avatar: '3759ae044d9e400591d104e254c58f89',
        description:
          'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
        links: [],
      },
      documents: [],
    },
  ],
  [
    'c3d262b0-48d7-41b5-9aeb-9f59affdd0f1',
    {
      profile: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        accountId: 'ca3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        isActive: true,
        profileType: ProfileTypeEnum.ORG,
        name: 'Filip Franczak',
        avatar: '6d3587a32aba453e8ad47199324f4c67',
        description:
          'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
        links: ['https://www.facebook.com/romuald.rumun', 'http://www.goledupyzeslaska.com'],
      },
      documents: [],
    },
  ],
]);

export const result: any = [
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    inviteDate: new Date('2018-08-27T08:02:42.409Z'),
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    isVisited: false,
  },
  {
    id: '473e64f2-3540-4925-bf54-dfe4ea4bfd15',
    inviteDate: new Date('2018-08-26T11:55:44.119Z'),
    serviceId: '75d15bc1-0520-43af-9180-b538e5e4f8f3',
    serviceName: 'JUPI',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    isVisited: false,
  },
];

export const result3: any = [
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: '',
    serviceOwnerAvatarToken: '',
    invitationStatus: 'NEW',
    inviteDate: new Date('2018-08-27T08:02:42.409Z'),
    isVisited: false,
  },
];

export const result4: any = [
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    inviteDate: new Date('2018-09-12T08:02:42.409Z'),
    isVisited: false,
  },
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    inviteDate: new Date('2018-08-27T08:02:42.409Z'),
    isVisited: false,
  },
  {
    id: 'f9e40393-88ff-461a-9772-e62574ce33c5',
    serviceId: 'e6e0a29a-bd56-460d-8320-58390092070f',
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    inviteDate: new Date('2018-08-26T08:02:45.409Z'),
    isVisited: false,
  },
];

export const result6: any = [];

describe('InvitationListResolverService', () => {
  const getProfileId = (profileId: string): any => of(profileMap.get(profileId));
  let invitationService: InvitationService;
  let profileService: ProfileService;
  let invitationListResolverService: InvitationListResolverService;
  const activatedRouteSnapshot: ActivatedRouteSnapshot = Deceiver(ActivatedRouteSnapshot);
  const routerStateSnapshot: RouterStateSnapshot = Deceiver(RouterStateSnapshot);
  beforeEach(() => {
    invitationService = Deceiver(InvitationService, {
      getInvitationsRoute: jest.fn().mockReturnValue(of(invitationsMock)),
    });

    profileService = Deceiver(ProfileService, {
      getProfileRoute: jest.fn().mockImplementation(getProfileId),
    });

    invitationListResolverService = new InvitationListResolverService(invitationService, profileService);
  });

  it('should be created', () => {
    expect(invitationListResolverService).toBeTruthy();
  });

  it('should call invitations', fakeAsync(() => {
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe();
    tick();
    expect(invitationService.getInvitationsRoute).toHaveBeenCalledTimes(1);
    expect(profileService.getProfileRoute).toHaveBeenCalledTimes(1);
  }));

  it('should return expected result', fakeAsync(() => {
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data).toEqual(result);
    });
  }));

  it('should call profile only once', fakeAsync(() => {
    const two = 2;
    (invitationService.getInvitationsRoute as jest.Mock).mockReturnValue(of(invitationsMock2));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe();
    tick();
    expect(profileService.getProfileRoute).toHaveBeenCalledTimes(two);
  }));

  it('should not throw if not organization details returned', fakeAsync(() => {
    (invitationService.getInvitationsRoute as jest.Mock).mockReturnValue(of(invitationsMock3));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data).toEqual(result3);
    });
    // this this tick will drain all times and makes sure that resolve does not throw
    tick();
  }));

  it('should sort array by date descending', fakeAsync(() => {
    (invitationService.getInvitationsRoute as jest.Mock).mockReturnValue(of(invitationsMock4));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data).toEqual(result4);
    });
    // this this tick will drain all times and makes sure that resolve does not throw
    tick();
  }));

  it('should filter invitations and take only new', fakeAsync(() => {
    const two = 2;
    (invitationService.getInvitationsRoute as jest.Mock).mockReturnValue(of(invitationsMock5));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data.length).toEqual(two);
    });
  }));

  it('should return empty array if there is are no pending intites', fakeAsync(() => {
    (invitationService.getInvitationsRoute as jest.Mock).mockReturnValue(of(invitationsMock6));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data).toEqual(result6);
    });
    tick();
  }));
});

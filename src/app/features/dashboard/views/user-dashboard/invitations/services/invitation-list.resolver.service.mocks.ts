// tslint:disable:max-line-length
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
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'NEW',
    createdAt: new Date('2018-08-26T08:02:45.409Z'),
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    status: 'NEW',
    createdAt: new Date('2018-08-27T08:02:42.409Z'),
  },
  {
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
export const profileMap = new Map<string, any>([
  [
    'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    {
      profile: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        isActive: true,
        organizationDetails: {
          name: 'Salta ,salta',
          logo: '3759ae044d9e400591d104e254c58f89',
          description:
            'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
          links: [],
        },
        expertDetails: {
          name: 'Filip Franczak',
          avatar: '6d3587a32aba453e8ad47199324f4c67',
          description:
            'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
          links: ['https://www.facebook.com/romuald.rumun', 'http://www.goledupyzeslaska.com'],
        },
      },
      organizationDocuments: [],
      expertDocuments: [],
    },
  ],
  [
    'c3d262b0-48d7-41b5-9aeb-9f59affdd0f2',
    {
      profile: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        isActive: true,
        organizationDetails: {
          name: 'Salta ,salta',
          logo: '3759ae044d9e400591d104e254c58f89',
          description:
            'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
          links: [],
        },
        expertDetails: {
          name: 'Filip Franczak',
          avatar: '6d3587a32aba453e8ad47199324f4c67',
          description:
            'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
          links: ['https://www.facebook.com/romuald.rumun', 'http://www.goledupyzeslaska.com'],
        },
      },
      organizationDocuments: [],
      expertDocuments: [],
    },
  ],
  [
    'c3d262b0-48d7-41b5-9aeb-9f59affdd0f1',
    {
      profile: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        isActive: true,
        expertDetails: {
          name: 'Filip Franczak',
          avatar: '6d3587a32aba453e8ad47199324f4c67',
          description:
            'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
          links: ['https://www.facebook.com/romuald.rumun', 'http://www.goledupyzeslaska.com'],
        },
      },
      organizationDocuments: [],
      expertDocuments: [],
    },
  ],
]);

export const result: any = [
  {
    inviteDate: new Date('2018-08-27T08:02:42.409Z'),
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    isVisited: false,
  },
  {
    inviteDate: new Date('2018-08-26T11:55:44.119Z'),
    serviceName: 'JUPI',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    isVisited: false,
  },
];

export const result3: any = [
  {
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
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    inviteDate: new Date('2018-09-12T08:02:42.409Z'),
    isVisited: false,
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    inviteDate: new Date('2018-08-27T08:02:42.409Z'),
    isVisited: false,
  },
  {
    serviceName: 'Bum, bum, bum',
    serviceOwnerName: 'Salta ,salta',
    serviceOwnerAvatarToken: '3759ae044d9e400591d104e254c58f89',
    invitationStatus: 'NEW',
    inviteDate: new Date('2018-08-26T08:02:45.409Z'),
    isVisited: false,
  },
];

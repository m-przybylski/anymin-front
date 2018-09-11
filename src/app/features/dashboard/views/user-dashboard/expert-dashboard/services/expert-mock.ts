// tslint:disable:max-line-length
// tslint:disable:max-file-line-count
import { ExpertProfileView } from '@anymind-ng/api';
import { IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';

export const expertProfileView: ExpertProfileView = {
  expertProfile: {
    id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    name: 'Filip Franczak',
    avatar: '6d3587a32aba453e8ad47199324f4c67',
    description:
      'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
    documents: [],
  },
  employments: [
    {
      id: '6c693138-b53d-4c49-bec1-f587e7a6ff77',
      serviceDetails: {
        id: '75d15bc1-0520-43af-9180-b538e5e4f8f3',
        ownerProfile: {
          id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
          isActive: true,
          organizationDetails: {
            name: 'To jest nazwa, ktora ma 60 znaków czyli tyle ile jest maxxxx',
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
        name: 'JUPI',
        description: 'Something, something',
        netPrice: {
          amount: 1429,
          currency: 'PLN',
        },
        grossPrice: {
          amount: 1758,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-27T08:52:31.741Z'),
      },
      employeeId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
      usageCounter: 0,
      commentCounter: 0,
      rating: 0,
      createdAt: new Date('2018-08-31T11:59:46.989Z'),
    },
    {
      id: 'f7c0982e-7d79-40f0-ac5c-138c554f68fd',
      serviceDetails: {
        id: '02927c7d-53b3-4294-9a11-9c288640c22b',
        ownerProfile: {
          id: 'd74eaf16-8eec-4ae4-80f7-3841b268fb98',
          isActive: true,
          organizationDetails: {
            name: 'Organizacja M4',
            logo: '6653395b55a3402596545f1e3621a94b',
            description: 'Opis organizacji M4',
            links: [],
          },
          expertDetails: {
            name: 'Super Mariusz',
            avatar: '78be744865f34d2383a3cd94940556e6',
            description: 'Naucze Cię życia',
            links: [],
          },
        },
        name: 'To jest jakas super dluga nazwa tylko, zeby zobaczyc jak to sie zagina i wygina, zagina i ',
        description: 'To bedzie opis, kiedys, dlugi',
        netPrice: {
          amount: 1757,
          currency: 'PLN',
        },
        grossPrice: {
          amount: 2161,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-09-04T08:37:24.022Z'),
      },
      employeeId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
      usageCounter: 0,
      commentCounter: 0,
      rating: 0,
      createdAt: new Date('2018-09-05T10:48:48.360Z'),
    },
  ],
  isFavourite: false,
};

export const expertProfileViewResult: IExpertCompanyDashboardResolverData<ExpertProfileView> = {
  profile: expertProfileView,
  isOwnProfile: false,
  isLogged: true,
};

export const expertProfileView1: ExpertProfileView = {
  expertProfile: {
    id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    name: 'Filip Franczak',
    avatar: '6d3587a32aba453e8ad47199324f4c67',
    description:
      'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
    documents: [],
  },
  employments: [
    {
      id: '6c693138-b53d-4c49-bec1-f587e7a6ff77',
      serviceDetails: {
        id: '75d15bc1-0520-43af-9180-b538e5e4f8f3',
        ownerProfile: {
          id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
          isActive: true,
          organizationDetails: {
            name: 'To jest nazwa, ktora ma 60 znaków czyli tyle ile jest maxxxx',
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
        name: 'JUPI',
        description: 'Something, something',
        netPrice: {
          amount: 1429,
          currency: 'PLN',
        },
        grossPrice: {
          amount: 1758,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-27T08:52:31.741Z'),
        deletedAt: new Date(),
      },
      employeeId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
      usageCounter: 0,
      commentCounter: 0,
      rating: 0,
      createdAt: new Date('2018-08-31T11:59:46.989Z'),
    },
    {
      id: 'f7c0982e-7d79-40f0-ac5c-138c554f68fd',
      serviceDetails: {
        id: '02927c7d-53b3-4294-9a11-9c288640c22b',
        ownerProfile: {
          id: 'd74eaf16-8eec-4ae4-80f7-3841b268fb98',
          isActive: true,
          organizationDetails: {
            name: 'Organizacja M4',
            logo: '6653395b55a3402596545f1e3621a94b',
            description: 'Opis organizacji M4',
            links: [],
          },
          expertDetails: {
            name: 'Super Mariusz',
            avatar: '78be744865f34d2383a3cd94940556e6',
            description: 'Naucze Cię życia',
            links: [],
          },
        },
        name: 'To jest jakas super dluga nazwa tylko, zeby zobaczyc jak to sie zagina i wygina, zagina i ',
        description: 'To bedzie opis, kiedys, dlugi',
        netPrice: {
          amount: 1757,
          currency: 'PLN',
        },
        grossPrice: {
          amount: 2161,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-09-04T08:37:24.022Z'),
      },
      employeeId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
      usageCounter: 0,
      commentCounter: 0,
      rating: 0,
      createdAt: new Date('2018-09-05T10:48:48.360Z'),
    },
  ],
  isFavourite: false,
};

export const expertProfileViewResult1: IExpertCompanyDashboardResolverData<ExpertProfileView> = {
  profile: {
    expertProfile: {
      id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
      name: 'Filip Franczak',
      avatar: '6d3587a32aba453e8ad47199324f4c67',
      description:
        'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
      documents: [],
    },
    employments: [
      {
        id: 'f7c0982e-7d79-40f0-ac5c-138c554f68fd',
        serviceDetails: {
          id: '02927c7d-53b3-4294-9a11-9c288640c22b',
          ownerProfile: {
            id: 'd74eaf16-8eec-4ae4-80f7-3841b268fb98',
            isActive: true,
            organizationDetails: {
              name: 'Organizacja M4',
              logo: '6653395b55a3402596545f1e3621a94b',
              description: 'Opis organizacji M4',
              links: [],
            },
            expertDetails: {
              name: 'Super Mariusz',
              avatar: '78be744865f34d2383a3cd94940556e6',
              description: 'Naucze Cię życia',
              links: [],
            },
          },
          name: 'To jest jakas super dluga nazwa tylko, zeby zobaczyc jak to sie zagina i wygina, zagina i ',
          description: 'To bedzie opis, kiedys, dlugi',
          netPrice: {
            amount: 1757,
            currency: 'PLN',
          },
          grossPrice: {
            amount: 2161,
            currency: 'PLN',
          },
          language: 'pl',
          isSuspended: false,
          isFreelance: false,
          createdAt: new Date('2018-09-04T08:37:24.022Z'),
        },
        employeeId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        usageCounter: 0,
        commentCounter: 0,
        rating: 0,
        createdAt: new Date('2018-09-05T10:48:48.360Z'),
      },
    ],
    isFavourite: false,
  },
  isOwnProfile: false,
  isLogged: true,
};

// tslint:disable:max-line-length
// tslint:disable:max-file-line-count
import {
  EmploymentWithExpertProfile,
  ExpertProfileView,
  GetProfileWithDocuments,
  PostProfileDetails,
} from '@anymind-ng/api';
import { IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { IExpertProfile } from '@platform/features/dashboard/views/user-dashboard/expert-dashboard/services/expert-dashboard.service';
import VatRateTypeEnum = EmploymentWithExpertProfile.VatRateTypeEnum;
import ProfileTypeEnum = PostProfileDetails.ProfileTypeEnum;

export const expertProfileView: ExpertProfileView = {
  expertProfile: {
    id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    accountId: 'asdasd',
    name: 'Filip Franczak',
    avatar: '6d3587a32aba453e8ad47199324f4c67',
    description:
      'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
    documents: [],
  },
  employments: [
    {
      id: '6c693138-b53d-4c49-bec1-f587e7a6ff77',
      ratingCounter: 2,
      vatRateType: VatRateTypeEnum.COMPANY0,
      serviceDetails: {
        id: '75d15bc1-0520-43af-9180-b538e5e4f8f3',
        vatRateType: VatRateTypeEnum.COMPANY0,
        ownerProfile: {
          id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
          accountId: 'asdasd',
          profileType: ProfileTypeEnum.EXP,
          isActive: true,
          name: 'To jest nazwa, ktora ma 60 znaków czyli tyle ile jest maxxxx',
          avatar: '3759ae044d9e400591d104e254c58f89',
          description:
            'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
          links: [],
        },
        name: 'JUPI',
        description: 'Something, something',
        price: {
          value: 1429,
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
      ratingCounter: 2,
      vatRateType: VatRateTypeEnum.COMPANY0,
      serviceDetails: {
        id: '02927c7d-53b3-4294-9a11-9c288640c22b',
        vatRateType: VatRateTypeEnum.COMPANY0,
        ownerProfile: {
          id: 'd74eaf16-8eec-4ae4-80f7-3841b268fb98',
          accountId: 'asdasdasdasd',
          profileType: ProfileTypeEnum.EXP,
          isActive: true,
          name: 'Organizacja M4',
          avatar: '6653395b55a3402596545f1e3621a94b',
          description: 'Opis organizacji M4',
          links: [],
        },
        name: 'To jest jakas super dluga nazwa tylko, zeby zobaczyc jak to sie zagina i wygina, zagina i ',
        description: 'To bedzie opis, kiedys, dlugi',
        price: {
          value: 1757,
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

export const getProfileWithDocuments: GetProfileWithDocuments = {
  profile: {
    id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    accountId: 'sadasdasdd2232323',
    isActive: true,
    profileType: ProfileTypeEnum.EXP,
    name: 'Filip albo inny oj inny',
    avatar: '6d3587a32aba453e8ad47199324f4c67',
    description:
      'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
    links: ['https://www.onet.pl'],
  },
  documents: [
    {
      name: 'org.png',
      token: '5e3cb8723dd549a5825200a8f3d34438',
      previews: [
        'https://stage.anymind.com/files//5e3cb8723dd549a5825200a8f3d34438/download/preview',
        'https://stage.anymind.com/files//5e3cb8723dd549a5825200a8f3d34438/download/320x320',
        'https://stage.anymind.com/files//5e3cb8723dd549a5825200a8f3d34438/download/400x500',
      ],
      contentType: 'image/png',
    },
  ],
};

export const expertProfileViewResult: IExpertCompanyDashboardResolverData<IExpertProfile> = {
  profile: {
    expertProfileView,
    getProfileWithDocuments,
  },
  isOwnProfile: false,
  isLogged: true,
  isCompany: false,
};

export const expertProfileView1: ExpertProfileView = {
  expertProfile: {
    id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    accountId: 'c3ddddd262b0-48d7-41b5-9aeb-9f59affdd0f3',
    name: 'Filip Franczak',
    avatar: '6d3587a32aba453e8ad47199324f4c67',
    description:
      'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
    documents: [],
  },
  employments: [
    {
      id: '6c693138-b53d-4c49-bec1-f587e7a6ff77',
      ratingCounter: 2,
      vatRateType: VatRateTypeEnum.COMPANY0,
      serviceDetails: {
        id: '75d15bc1-0520-43af-9180-b538e5e4f8f3',
        vatRateType: VatRateTypeEnum.COMPANY0,
        ownerProfile: {
          id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
          accountId: 'asdasd-123123123asdasd',
          profileType: ProfileTypeEnum.ORG,
          isActive: true,
          name: 'To jest nazwa, ktora ma 60 znaków czyli tyle ile jest maxxxx',
          avatar: '3759ae044d9e400591d104e254c58f89',
          description:
            'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
          links: [],
        },
        name: 'JUPI',
        description: 'Something, something',
        price: {
          value: 1429,
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
      ratingCounter: 2,
      vatRateType: VatRateTypeEnum.COMPANY0,
      serviceDetails: {
        id: '02927c7d-53b3-4294-9a11-9c288640c22b',
        vatRateType: VatRateTypeEnum.COMPANY0,
        ownerProfile: {
          id: 'd74eaf16-8eec-4ae4-80f7-3841b268fb98',
          accountId: 'd74eassssf16-8eec-4ae4-80f7-3841b268fb98',
          profileType: ProfileTypeEnum.ORG,
          isActive: true,
          name: 'Organizacja M4',
          avatar: '6653395b55a3402596545f1e3621a94b',
          description: 'Opis organizacji M4',
          links: [],
        },
        name: 'To jest jakas super dluga nazwa tylko, zeby zobaczyc jak to sie zagina i wygina, zagina i ',
        description: 'To bedzie opis, kiedys, dlugi',
        price: {
          value: 1757,
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

export const expertProfileViewResult1: IExpertCompanyDashboardResolverData<IExpertProfile> = {
  profile: {
    expertProfileView: {
      expertProfile: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        accountId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'Filip Franczak',
        avatar: '6d3587a32aba453e8ad47199324f4c67',
        description:
          'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
        documents: [],
      },
      employments: [
        {
          id: 'f7c0982e-7d79-40f0-ac5c-138c554f68fd',
          ratingCounter: 2,
          vatRateType: VatRateTypeEnum.COMPANY0,
          serviceDetails: {
            id: '02927c7d-53b3-4294-9a11-9c288640c22b',
            vatRateType: VatRateTypeEnum.COMPANY0,
            ownerProfile: {
              id: 'd74eaf16-8eec-4ae4-80f7-3841b268fb98',
              accountId: 'd74eaf16-8eec-4ae4-80f7-3841b268fb98',
              profileType: ProfileTypeEnum.ORG,
              isActive: true,
              name: 'Organizacja M4',
              avatar: '6653395b55a3402596545f1e3621a94b',
              description: 'Opis organizacji M4',
              links: [],
            },
            name: 'To jest jakas super dluga nazwa tylko, zeby zobaczyc jak to sie zagina i wygina, zagina i ',
            description: 'To bedzie opis, kiedys, dlugi',
            price: {
              value: 1757,
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
    getProfileWithDocuments,
  },
  isOwnProfile: false,
  isLogged: true,
  isCompany: false,
};

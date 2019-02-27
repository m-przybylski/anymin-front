// tslint:disable:max-line-length
// tslint:disable:max-file-line-count

import { OrganizationProfileView, GetProfileWithDocuments, Account, PostProfileDetails } from '@anymind-ng/api';
import { IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { IOrganizationProfile } from './company-profile.service';
import VatRateTypeEnum = Account.VatRateTypeEnum;
import ProfileTypeEnum = PostProfileDetails.ProfileTypeEnum;

export const organizationProfileView: OrganizationProfileView = {
  organizationProfile: {
    id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    accountId: 'c3d262b0-48d7-41b5-2323239aeb-9f59affdd0f3',
    name: 'To jest nazwa, ktora ma 60 znaków czyli tyle ile jest maxxxx',
    avatar: '3759ae044d9e400591d104e254c58f89',
    description:
      'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
    documents: [],
  },
  services: [
    {
      service: {
        id: '9effa37a-397b-4bcc-8c8f-26576e7222df',
        ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'Salta do przedu',
        description:
          'To jest opis mojej konsultacji. Ona jest najlepsza w tym serwisie. Mam jeszcze kilka innych, ale pewnie nie chciałbyś tego widzieć',
        price: {
          value: 581,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-09T10:03:26.592Z'),
      },
      employments: [
        {
          id: '62508989-2f01-4c98-8dc9-cf4b6f19b192',
          ratingCounter: 1,
          serviceId: '9effa37a-397b-4bcc-8c8f-26576e7222df',
          vatRateType: VatRateTypeEnum.NATURALPERSON,
          employeeProfile: {
            id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
            accountId: 'c3d26223232b0-48d7-41b5-9aeb-9f59affdd0f3',
            name: 'Filip Franczak',
            avatar: '6d3587a32aba453e8ad47199324f4c67',
            description:
              'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
          },
          usageCounter: 0,
          commentCounter: 0,
          rating: 0,
          createdAt: new Date('2018-09-04T06:18:49.549Z'),
        },
      ],
    },
    {
      service: {
        id: '26200085-13a0-4693-9e60-c8a9706ba1eb',
        ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'dlubanie w nosie',
        description: 'bunga bunga i takie tam inne rzeczy',
        price: {
          value: 1533,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-09T13:53:38.223Z'),
      },
      employments: [],
    },
    {
      service: {
        id: '2e9036d0-9357-45e8-97d2-6f2441998ea6',
        ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'nazwa, bardzo dluga nazwa, bardzo bardzo dluga nazwa, jeszcze dluzsza, ojejku moje jeszcze',
        description:
          'opis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opis',
        price: {
          value: 8049,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-09T13:57:02.600Z'),
      },
      employments: [],
    },
    {
      service: {
        id: '5134bd8d-271e-491f-a0e2-ebd439035406',
        ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'sfadsfsdfasdfasdf',
        description: 'safasdfasdfasdfasdfasd',
        price: {
          value: 115,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-09T14:02:09.811Z'),
      },
      employments: [],
    },
  ],
  isFavourite: false,
};

export const profileWithDocuments: GetProfileWithDocuments = {
  profile: {
    id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    accountId: 'c3d2622222b0-48d7-41b5-9aeb-9f59affdd0f3',
    isActive: true,
    profileType: ProfileTypeEnum.EXP,
    name: 'To jest nazwa, ktora ma 60 znaków czyli tyle ile jest maxxxx',
    avatar: '3759ae044d9e400591d104e254c58f89',
    description:
      'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
    links: [],
  },
  documents: [],
};

export const companyProfileView: IExpertCompanyDashboardResolverData<IOrganizationProfile> = {
  profile: {
    organization: organizationProfileView,
    profile: profileWithDocuments,
  },
  isOwnProfile: false,
  isLogged: true,
  isCompany: true,
};

export const organizationProfileView1: OrganizationProfileView = {
  organizationProfile: {
    id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    accountId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
    name: 'To jest nazwa, ktora ma 60 znaków czyli tyle ile jest maxxxx',
    avatar: '3759ae044d9e400591d104e254c58f89',
    description:
      'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
    documents: [],
  },
  services: [
    {
      service: {
        id: '9effa37a-397b-4bcc-8c8f-26576e7222df',
        ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'Salta do przedu',
        description:
          'To jest opis mojej konsultacji. Ona jest najlepsza w tym serwisie. Mam jeszcze kilka innych, ale pewnie nie chciałbyś tego widzieć',
        price: {
          value: 581,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-09T10:03:26.592Z'),
      },
      employments: [
        {
          id: '62508989-2f01-4c98-8dc9-cf4b6f19b192',
          serviceId: '9effa37a-397b-4bcc-8c8f-26576e7222df',
          ratingCounter: 1,
          vatRateType: VatRateTypeEnum.NATURALPERSON,
          employeeProfile: {
            id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
            accountId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
            name: 'Filip Franczak',
            avatar: '6d3587a32aba453e8ad47199324f4c67',
            description:
              'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
          },
          usageCounter: 0,
          commentCounter: 0,
          rating: 0,
          createdAt: new Date('2018-09-04T06:18:49.549Z'),
        },
      ],
    },
    {
      service: {
        id: '26200085-13a0-4693-9e60-c8a9706ba1eb',
        ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'dlubanie w nosie',
        description: 'bunga bunga i takie tam inne rzeczy',
        price: {
          value: 1533,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-09T13:53:38.223Z'),
      },
      employments: [],
    },
    {
      service: {
        id: '2e9036d0-9357-45e8-97d2-6f2441998ea6',
        ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'nazwa, bardzo dluga nazwa, bardzo bardzo dluga nazwa, jeszcze dluzsza, ojejku moje jeszcze',
        description:
          'opis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opisopis, opis, opis, opis, opis',
        price: {
          value: 8049,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-09T13:57:02.600Z'),
        deletedAt: new Date(),
      },
      employments: [],
    },
    {
      service: {
        id: '5134bd8d-271e-491f-a0e2-ebd439035406',
        ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'sfadsfsdfasdfasdf',
        description: 'safasdfasdfasdfasdfasd',
        price: {
          value: 115,
          currency: 'PLN',
        },
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date('2018-08-09T14:02:09.811Z'),
        deletedAt: new Date(),
      },
      employments: [],
    },
  ],
  isFavourite: false,
};

export const companyProfileView1: IExpertCompanyDashboardResolverData<IOrganizationProfile> = {
  profile: {
    organization: {
      organizationProfile: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        accountId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        name: 'To jest nazwa, ktora ma 60 znaków czyli tyle ile jest maxxxx',
        avatar: '3759ae044d9e400591d104e254c58f89',
        description:
          'To jest jakis madry opis. Bedzie tez bardzo dlugi po to, zeby zobaczyc jak sie tekst lamie na roznych urzadzeniach. A moze ja to porostu skopiuje. Albo zapisze sobie cos. Hmmm. Moze very slow = sluggy, very poor = destitute xD xD Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat  ',
        documents: [],
      },
      services: [
        {
          service: {
            id: '9effa37a-397b-4bcc-8c8f-26576e7222df',
            ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
            name: 'Salta do przedu',
            description:
              'To jest opis mojej konsultacji. Ona jest najlepsza w tym serwisie. Mam jeszcze kilka innych, ale pewnie nie chciałbyś tego widzieć',
            price: {
              value: 581,
              currency: 'PLN',
            },
            language: 'pl',
            isSuspended: false,
            isFreelance: false,
            createdAt: new Date('2018-08-09T10:03:26.592Z'),
          },
          employments: [
            {
              id: '62508989-2f01-4c98-8dc9-cf4b6f19b192',
              serviceId: '9effa37a-397b-4bcc-8c8f-26576e7222df',
              ratingCounter: 1,
              vatRateType: VatRateTypeEnum.NATURALPERSON,
              employeeProfile: {
                id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
                accountId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
                name: 'Filip Franczak',
                avatar: '6d3587a32aba453e8ad47199324f4c67',
                description:
                  'Podczas konsultacji pomogę Ci dobrać odpowiednią msakfeqwih ffh dsa fh;weoah faweuhf iuwaehf liwhfliuawehfiuuhawlief uaw;fawliufha iwuhf liawegef liawgfliauwgfliuawgfil awlif wliuf . awliu fiwaehf liaw hf iawh fiawhfliuawhfliawhifag wlefgawifliweli fliagilfgwau fgwlifeg awlifg iawegfliaweg fliawegfi awg ifluawg iufagwlifugawliuflwiwuuhfe ilwahfuawe sjdfasojfoiwje wfj woiefj awefjaweoi;jef wjoi jwaeofij woifj wo;ije oiwajef o;iawjf ;oiawijfoi awjfo;iawj foejawo;eif jaw;oijf oawfi wafu hwoiefj awo',
              },
              usageCounter: 0,
              commentCounter: 0,
              rating: 0,
              createdAt: new Date('2018-09-04T06:18:49.549Z'),
            },
          ],
        },
        {
          service: {
            id: '26200085-13a0-4693-9e60-c8a9706ba1eb',
            ownerId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
            name: 'dlubanie w nosie',
            description: 'bunga bunga i takie tam inne rzeczy',
            price: {
              value: 1533,
              currency: 'PLN',
            },
            language: 'pl',
            isSuspended: false,
            isFreelance: false,
            createdAt: new Date('2018-08-09T13:53:38.223Z'),
          },
          employments: [],
        },
      ],
      isFavourite: false,
    },
    profile: profileWithDocuments,
  },
  isOwnProfile: false,
  isLogged: true,
  isCompany: true,
};

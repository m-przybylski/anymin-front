import { IState, reducer } from './session.reducer';
import { SessionUpdateApiActions, SessionApiActions } from '../actions';
import { Account } from '@anymind-ng/api';

describe('session.reducer', () => {
  const initialState: IState = {
    isFromBackend: false,
    isPending: false,
  };
  const storeWithSession: any = {
    isFromBackend: true,
    isPending: false,
    session: {
      account: {
        id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        msisdn: '81927398127',
        email: 'fgg@hfd.pl',
        registeredAt: new Date('2018-08-09T10:00:35.039Z'),
        details: {
          nickname: 'ASD',
          avatar: 'fsafasdf',
        },
        isBlocked: false,
        hasPassword: true,
        isAnonymous: true,
      },
      session: {
        accountId: '123',
        apiKey: 'zxxx',
        city: 'sdf',
        country: 'aaa',
        ipAddress: '13123',
        isExpired: false,
        lastActivityAt: new Date('2018-11-09T10:00:35.039Z'),
        userAgent: 'aa',
      },
      isCompany: false,
      isExpert: false,
    },
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('CreateUpdateNameAndAvatarAction', () => {
    it('should update store even if no session', () => {
      const result = reducer(
        initialState,
        new SessionUpdateApiActions.CreateUpdateNameAndAvatarAction({ name: 'Artuś', avatarToken: '💩' }),
      );
      expect(result).toEqual(initialState as any);
    });
    it('should update store even if session exists', () => {
      const result = reducer(
        storeWithSession,
        new SessionUpdateApiActions.CreateUpdateNameAndAvatarAction({ name: 'Artuś', avatarToken: '💩' }),
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('UpdateAccountInSession', () => {
    const account: Account = {
      id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
      msisdn: '🦄',
      email: '🦄🦄@🦄🦄.pl',
      registeredAt: new Date('2018-08-09T10:00:35.039Z'),
      isBlocked: false,
      hasPassword: true,
      isAnonymous: true,
      details: {
        clientId: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
        nickname: '🦄🦄🦄🦄🦄🦄🦄🦄',
        avatar: '6d3587a32aba453e8ad47199324f4c67',
      },
      currency: 'PLN',
      countryISO: 'PL',
      vatRateType: 'COMPANY_23' as Account.VatRateTypeEnum,
    };
    it('should not modify state when no session exists in store', () => {
      const result = reducer(initialState, new SessionApiActions.UpdateAccountInSession(account));
      expect(result).toEqual(initialState as any);
    });
    it('should update account in GetSessionWithAccount object', () => {
      const result = reducer(storeWithSession, new SessionApiActions.UpdateAccountInSession(account));
      expect(result).toMatchSnapshot();
    });
  });
});

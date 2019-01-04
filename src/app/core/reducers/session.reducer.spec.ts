import { IState, reducer } from './session.reducer';
import { SessionUpdateApiActions } from '../actions';

describe('balance.reducer', () => {
  const initialState: IState = {
    isFromBackend: false,
    isPending: false,
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
      const storeWithSession: any = {
        isFromBackend: true,
        isPending: false,
        session: {
          account: {
            id: 'c3d262b0-48d7-41b5-9aeb-9f59affdd0f3',
            msisdn: '+48607508372',
            email: 'maciej.przybylski@anymind.com',
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
      const result = reducer(
        storeWithSession,
        new SessionUpdateApiActions.CreateUpdateNameAndAvatarAction({ name: 'Artuś', avatarToken: '💩' }),
      );
      expect(result).toMatchSnapshot();
    });
  });
});

import { ConsultationFooterResolver, IFooterResolverPayload } from './consultation-footer.resolver';
import { ConsultationFooterMultipleExpertComponent } from './consultation-footer-multiple-expert/consultation-footer-multiple-expert.component';
import { ConsultationFooterUserComponent } from './consultation-footer-user/consultation-footer-user.component';
import { ConsultationFooterLeaveComponent } from './consultation-footer-leave/consultation-footer-leave.component';
import { ConsultationFooterEditComponent } from './consultation-footer-edit/consultation-footer-edit.component';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

describe('ConsultationFooterResolver', () => {
  describe('resolveV2', () => {
    it('should return ConsultationFooterUserComponent for not logged user', () => {
      const payload: IFooterResolverPayload = {
        serviceOwnerProfileId: 'fake owner profile id',
        expertProfileIdList: [],
      };
      const result = ConsultationFooterResolver.resolve(payload);
      expect(result).toEqual(ConsultationFooterUserComponent);
    });

    describe('user context', () => {
      const payload: Partial<IFooterResolverPayload> = {
        userType: UserTypeEnum.USER,
        userAccountId: 'fake user account id',
      };
      it('should return ConsultationFooterUserComponent', () => {
        const payload: IFooterResolverPayload = {
          serviceOwnerProfileId: 'fake owner profile id',
          expertProfileIdList: [],
        };
        const result = ConsultationFooterResolver.resolve(payload);
        expect(result).toEqual(ConsultationFooterUserComponent);
      });

      it('should display ConsultationFooterMultipleExpertComponent for multiple experts', () => {
        const localPayload = {
          serviceOwnerProfileId: 'fake owner profile id',
          expertProfileIdList: ['expert 1', 'expert 2', 'expert 3'],
        };

        const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
        expect(result).toEqual(ConsultationFooterMultipleExpertComponent);
      });
    });

    describe('expert profile context', () => {
      const payload = {
        userType: UserTypeEnum.EXPERT,
        userExpertProfileId: 'fake expert profile id',
      };
      it(
        'should return ConsultationFooterUserComponent' +
          ' for service which does not belong to user and user is not on the expert list',
        () => {
          const localPayload = {
            userAccountId: 'fake user account id',
            serviceOwnerProfileId: 'fake owner profile id',
            expertProfileIdList: [],
          };
          const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
          expect(result).toEqual(ConsultationFooterUserComponent);
        },
      );

      it('should return ConsultationFooterLeaveComponent for service where logged user is an expert', () => {
        const localPayload = {
          userAccountId: 'fake user account id',
          serviceOwnerProfileId: 'fake owner profile id',
          expertProfileIdList: ['fake expert profile id', 'yae_1', 'yae_2'],
        };
        const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
        expect(result).toEqual(ConsultationFooterLeaveComponent);
      });

      it('should return ConsultationFooterEditComponent for organization which belongs to logged user', () => {
        const localPayload = {
          userAccountId: 'fake user account id',
          serviceOwnerProfileId: 'fake expert profile id',
          expertProfileIdList: ['fake expert profile id', 'yae_1', 'yae_2'],
        };
        const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
        expect(result).toEqual(ConsultationFooterEditComponent);
      });
    });
    describe('organization profile context', () => {
      const payload = {
        userType: UserTypeEnum.COMPANY,
        userOrganizationProfileId: 'fake organization profile id',
      };
      it(
        'should return ConsultationFooterUserComponent' +
          ' for service which does not belong to user and user is not on the expert list',
        () => {
          const localPayload = {
            userAccountId: 'fake user account id',
            serviceOwnerProfileId: 'fake owner profile id',
            expertProfileIdList: [],
          };
          const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
          expect(result).toEqual(ConsultationFooterUserComponent);
        },
      );
      it('should return ConsultationFooterLeaveComponent for service where logged user is an expert', () => {
        const localPayload = {
          userAccountId: 'fake user account id',
          serviceOwnerProfileId: 'fake owner profile id',
          expertProfileIdList: ['fake expert profile id'],
        };
        const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
        expect(result).toEqual(ConsultationFooterUserComponent);
      });
      it('should display ConsultationFooterMultipleExpertComponent for multiple experts', () => {
        const localPayload = {
          userAccountId: 'fake user account id',
          serviceOwnerProfileId: 'fake owner profile id',
          expertProfileIdList: ['expert 1', 'expert 2', 'expert 3'],
        };

        const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
        expect(result).toEqual(ConsultationFooterMultipleExpertComponent);
      });
      it('should return ConsultationFooterEditComponent for organization which belongs to logged user', () => {
        const localPayload = {
          userAccountId: 'fake user account id',
          serviceOwnerProfileId: 'fake organization profile id',
          expertProfileIdList: ['fake expert profile id', 'yae_1', 'yae_2'],
        };
        const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
        expect(result).toEqual(ConsultationFooterEditComponent);
      });
    });
    describe('expert and organization profile context', () => {
      const payload = {
        userExpertProfileId: 'fake expert profile id',
        userOrganizationProfileId: 'fake organization profile id',
      };
      it(
        'should return ConsultationFooterUserComponent' +
          ' for service which does not belong to user and user is not on the expert list',
        () => {
          const localPayload = {
            userAccountId: 'fake user account id',
            serviceOwnerProfileId: 'fake owner profile id',
            expertProfileIdList: [],
          };
          const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
          expect(result).toEqual(ConsultationFooterUserComponent);
        },
      );
      it('should return ConsultationFooterLeaveComponent for service where logged user is an expert', () => {
        const localPayload = {
          userAccountId: 'fake user account id',
          serviceOwnerProfileId: 'fake owner profile id',
          expertProfileIdList: ['fake expert profile id', 'yae_1', 'yae_2'],
        };
        const result = ConsultationFooterResolver.resolve({ ...payload, ...localPayload });
        expect(result).toEqual(ConsultationFooterLeaveComponent);
      });
    });
  });
});

import { ConsultationFooterResolver } from './consultation-footer.resolver';
import { ConsultationFooterMultipleExpertComponent } from './consultation-footer-multiple-expert/consultation-footer-multiple-expert.component';
import { ConsultationFooterUserComponent } from './consultation-footer-user/consultation-footer-user.component';
import { ConsultationFooterLeaveComponent } from './consultation-footer-leave/consultation-footer-leave.component';
import { ConsultationFooterEditComponent } from './consultation-footer-edit/consultation-footer-edit.component';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

describe('ConsultationFooterResolver', () => {
  it('should return ConsultationFooterUserComponent when user is not looged', () => {
    const userType = UserTypeEnum.EXPERT;
    const userId = undefined;
    expect(ConsultationFooterResolver.resolve(userType, userId)).toEqual(ConsultationFooterUserComponent);
  });

  it('should return ConsultationFooterUserComponent when user is not looged', () => {
    const userType = UserTypeEnum.EXPERT;
    const userId = 'arturek';
    const ownerId = 'nie.arturek';
    const expertListId = ['nie.arturek'] as ReadonlyArray<string>;
    const isCompany = false;

    expect(ConsultationFooterResolver.resolve(userType, isCompany, userId, ownerId, expertListId)).toEqual(
      ConsultationFooterUserComponent,
    );
  });

  it(
    'should return ConsultationFooterLeaveComponent for logged user but not owner of service' +
      'and there is more than one expert who provides service',
    () => {
      const userType = UserTypeEnum.EXPERT;
      const userId = 'arturek';
      const ownerId = 'księciunio';
      const expertListId = ['arturek', 'macius'] as ReadonlyArray<string>;
      const isCompany = false;
      expect(ConsultationFooterResolver.resolve(userType, isCompany, userId, ownerId, expertListId)).toEqual(
        ConsultationFooterLeaveComponent,
      );
    },
  );

  it(
    'should return ConsultationFooterMultipleExpertComponent for logged user but not owner of service' +
      'and there is more than one expert who provides service',
    () => {
      const userType = UserTypeEnum.EXPERT;
      const userId = 'arturek';
      const ownerId = 'księciunio';
      const expertListId = ['misiaczek', 'macius'] as ReadonlyArray<string>;
      const isCompany = false;
      expect(ConsultationFooterResolver.resolve(userType, isCompany, userId, ownerId, expertListId)).toEqual(
        ConsultationFooterMultipleExpertComponent,
      );
    },
  );

  it(
    'should return ConsultationFooterLeaveComponent for logged user who is owner of service' +
      'and he checks consultation details as expert and he has company',
    () => {
      const userType = UserTypeEnum.EXPERT;
      const userId = 'arturek';
      const ownerId = 'arturek';
      const expertListId = ['kubus', 'macius', 'mikolajek', 'januszek', 'arturek'] as ReadonlyArray<string>;
      const isCompany = true;
      expect(ConsultationFooterResolver.resolve(userType, isCompany, userId, ownerId, expertListId)).toEqual(
        ConsultationFooterLeaveComponent,
      );
    },
  );

  it(
    'should return ConsultationFooterLeaveComponent for logged user which is not an owner' +
      'and he provides service in that consultation',
    () => {
      const userId = 'arturek';
      const ownerId = 'not.arturek';
      const expertListId = ['arturek'] as ReadonlyArray<string>;
      const userType = UserTypeEnum.EXPERT;
      const isCompany = true;
      expect(ConsultationFooterResolver.resolve(userType, isCompany, userId, ownerId, expertListId)).toEqual(
        ConsultationFooterLeaveComponent,
      );
    },
  );

  it('should return ConsultationFooterEditComponent for logged user which is an owner', () => {
    const userType = UserTypeEnum.EXPERT;
    const userId = 'arturek';
    const ownerId = 'arturek';
    const expertListId = ['arturek'] as ReadonlyArray<string>;
    const isCompany = false;
    expect(ConsultationFooterResolver.resolve(userType, isCompany, userId, ownerId, expertListId)).toEqual(
      ConsultationFooterEditComponent,
    );
  });

  it('should return undefined for logged user an no list is provided', () => {
    const userType = UserTypeEnum.EXPERT;
    const userId = 'arturek';
    const ownerId = 'nie.arturek';
    const expertListId = undefined;
    const isCompany = false;
    expect(ConsultationFooterResolver.resolve(userType, isCompany, userId, ownerId, expertListId)).toEqual(undefined);
  });
});

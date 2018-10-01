import { ConsultationFooterResolver } from './consultation-footer.resolver';
import { ConsultationFooterMultipleExpertComponent } from './consultation-footer-multiple-expert/consultation-footer-multiple-expert.component';
import { ConsultationFooterUserComponent } from './consultation-footer-user/consultation-footer-user.component';
import { ConsultationFooterLeaveComponent } from './consultation-footer-leave/consultation-footer-leave.component';
import { ConsultationFooterEditComponent } from './consultation-footer-edit/consultation-footer-edit.component';

describe('ConsultationFooterResolver', () => {
  it('should return ConsultationFooterUserComponent when user is not looged', () => {
    const userId = undefined;
    expect(ConsultationFooterResolver.resolve(userId)).toEqual(ConsultationFooterUserComponent);
  });

  it('should return ConsultationFooterMultipleExpertComponent for logged user but no expertId provided', () => {
    const userId = 'arturek';
    const expertId = undefined;
    expect(ConsultationFooterResolver.resolve(userId, expertId)).toEqual(ConsultationFooterMultipleExpertComponent);
  });

  it('should return ConsultationFooterMultipleExpertComponent for logged user but no expertId provided', () => {
    const userId = 'arturek';
    const expertId = 'nie.arturek';
    const expertListId = ['kubus', 'macius', 'mikolajek', 'januszek', 'arturek'] as ReadonlyArray<string>;
    expect(ConsultationFooterResolver.resolve(userId, expertId, expertListId)).toEqual(
      ConsultationFooterLeaveComponent,
    );
  });

  it('should return ConsultationFooterEditComponent for logged user which is an owner', () => {
    const userId = 'arturek';
    const expertId = 'arturek';
    const expertListId = ['arturek'] as ReadonlyArray<string>;
    expect(ConsultationFooterResolver.resolve(userId, expertId, expertListId)).toEqual(ConsultationFooterEditComponent);
  });

  it('should return undefined for logged user an no list is provided', () => {
    const userId = 'arturek';
    const expertId = 'nie.arturek';
    const expertListId = undefined;
    expect(ConsultationFooterResolver.resolve(userId, expertId, expertListId)).toEqual(undefined);
  });
});

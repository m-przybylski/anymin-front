import { FooterComponentConstructor } from './consultation-footer-helpers';
import { ConsultationFooterMultipleExpertComponent } from './consultation-footer-multiple-expert/consultation-footer-multiple-expert.component';
import { ConsultationFooterUserComponent } from './consultation-footer-user/consultation-footer-user.component';
import { ConsultationFooterLeaveComponent } from './consultation-footer-leave/consultation-footer-leave.component';
import { ConsultationFooterEditComponent } from './consultation-footer-edit/consultation-footer-edit.component';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

export class ConsultationFooterResolver {
  /**
   * @param userType type of profile currently being logged as
   * @param isCompany value represents if logged account isCompany
   * @param userAccountId account id of user or undefined if user not logged
   * @param ownerAccountId account id or an owner of the consultation
   * @param userExpertProfileId logged user expert profile id
   * @param expertProfileIdList list of expert's account ids assigned to consultation
   */
  // tslint:disable-next-line:cyclomatic-complexity
  public static resolve(
    userType?: UserTypeEnum,
    isCompany = false,
    userAccountId?: string,
    ownerAccountId?: string,
    userExpertProfileId?: string,
    expertProfileIdList?: ReadonlyArray<string>,
  ): FooterComponentConstructor | undefined {
    if (userAccountId === undefined) {
      // user is not logged so display user footer
      return ConsultationFooterUserComponent;
    }

    if (expertProfileIdList !== undefined) {
      // there is a list of experts so we can use it

      if (
        userAccountId !== ownerAccountId &&
        expertProfileIdList.some(fromListExpertId => fromListExpertId === userExpertProfileId)
      ) {
        // user is not owner of service and he provides service for that consultation
        return ConsultationFooterLeaveComponent;
      }

      if (userAccountId !== ownerAccountId && expertProfileIdList.length > 1) {
        // user is not owner of service and there is more than one expert who provides service
        return ConsultationFooterMultipleExpertComponent;
      }

      if (userAccountId === ownerAccountId) {
        if (userType === UserTypeEnum.EXPERT && isCompany) {
          // user is owner of service and he checks consultation details as expert and he has company
          return ConsultationFooterLeaveComponent;
        }

        // user is owner of service
        return ConsultationFooterEditComponent;
      }

      // default footer
      return ConsultationFooterUserComponent;
    }

    return undefined;
  }
}

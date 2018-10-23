import { FooterComponentConstructor } from './consultation-footer-helpers';
import { ConsultationFooterMultipleExpertComponent } from './consultation-footer-multiple-expert/consultation-footer-multiple-expert.component';
import { ConsultationFooterUserComponent } from './consultation-footer-user/consultation-footer-user.component';
import { ConsultationFooterLeaveComponent } from './consultation-footer-leave/consultation-footer-leave.component';
import { ConsultationFooterEditComponent } from './consultation-footer-edit/consultation-footer-edit.component';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

export class ConsultationFooterResolver {
  /**
   * @param userId id of user or undefined if user not logged
   * @param ownerId id or an owner of the consultation
   * @param expertIdList list of experts assigned to consultation
   * @param userType type of user based on information from given value or Store
   * @param isCompany boolean based on information from Store
   */
  // tslint:disable-next-line:cyclomatic-complexity
  public static resolve(
    userType: UserTypeEnum,
    isCompany = false,
    userId?: string,
    ownerId?: string,
    expertIdList?: ReadonlyArray<string>,
  ): FooterComponentConstructor | undefined {
    if (userId === undefined) {
      // user is not logged so display user footer
      return ConsultationFooterUserComponent;
    }

    if (expertIdList !== undefined) {
      // there is a list of experts so we can use it

      if (userId !== ownerId && expertIdList.some(fromListExpertId => fromListExpertId === userId)) {
        // user is not owner of service and he provides service for that consultation
        return ConsultationFooterLeaveComponent;
      }

      if (userId !== ownerId && expertIdList.length > 1) {
        // user is not owner of service and there is more than one expert who provides service
        return ConsultationFooterMultipleExpertComponent;
      }

      if (userId === ownerId) {
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

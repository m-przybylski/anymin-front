import { FooterComponentConstructor } from './consultation-footer-helpers';
import { ConsultationFooterMultipleExpertComponent } from './consultation-footer-multiple-expert/consultation-footer-multiple-expert.component';
import { ConsultationFooterUserComponent } from './consultation-footer-user/consultation-footer-user.component';
import { ConsultationFooterLeaveComponent } from './consultation-footer-leave/consultation-footer-leave.component';
import { ConsultationFooterEditComponent } from './consultation-footer-edit/consultation-footer-edit.component';

export class ConsultationFooterResolver {
  /**
   * @param userId id of user or undefined if user not logged
   * @param expertId id or an expert assiged to consultation
   * @param expertIdList list of experts assigned to consultation
   */
  // tslint:disable-next-line:cyclomatic-complexity
  public static resolve(
    userId?: string,
    expertId?: string,
    expertIdList?: ReadonlyArray<string>,
  ): FooterComponentConstructor | undefined {
    if (userId === undefined) {
      // user is not logged so display user footer
      return ConsultationFooterUserComponent;
    }

    if (expertId === undefined) {
      // expert not selected display multiple expert
      return ConsultationFooterMultipleExpertComponent;
    }

    if (expertIdList !== undefined) {
      // there is a list of experts so we can use it
      if (userId !== expertId && expertIdList.some(fromListExpertId => fromListExpertId === userId)) {
        return ConsultationFooterLeaveComponent;
      }
      if (userId === expertId) {
        return ConsultationFooterEditComponent;
      }

      return ConsultationFooterUserComponent;
    }

    return undefined;
  }
}

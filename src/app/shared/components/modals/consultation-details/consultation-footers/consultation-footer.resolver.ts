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
  public static resolve(payload: IFooterResolverPayload): FooterComponentConstructor | undefined {
    const selectedProfileId =
      payload.userType === UserTypeEnum.EXPERT
        ? payload.userExpertProfileId
        : payload.userType === UserTypeEnum.COMPANY
        ? payload.userOrganizationProfileId
        : undefined;
    if (payload.userAccountId === undefined) {
      return ConsultationFooterUserComponent;
    }

    if (selectedProfileId !== payload.serviceOwnerProfileId) {
      // consultation is not mine
      if (!payload.expertProfileIdList.includes(payload.userExpertProfileId || '')) {
        // i'm not an expert
        if (payload.expertProfileIdList.length > 1) {
          return ConsultationFooterMultipleExpertComponent;
        }

        return ConsultationFooterUserComponent;
      } else {
        return ConsultationFooterLeaveComponent;
      }
    } else {
      return ConsultationFooterEditComponent;
    }
  }
}
export interface IFooterResolverPayload {
  /**
   * profile id of the owner of selected service
   */
  serviceOwnerProfileId: string;
  /**
   * expert profile id for logged user
   */
  userExpertProfileId?: string;
  /**
   * organization profile id for logged user
   */
  userOrganizationProfileId?: string;
  /**
   * account id for logged user - to check if there is a user
   */
  userAccountId?: string;
  /**
   * list of all experts assigned to that consultation
   */
  expertProfileIdList: ReadonlyArray<string>;
  /**
   * logged user type
   */
  userType?: UserTypeEnum;
}

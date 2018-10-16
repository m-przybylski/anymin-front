// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-conditional-expression
import { UrlService } from '../../../services/url/url.service';
import { IUserAvatarComponentBindings } from './user-avatar';

// tslint:disable:member-ordering
export class UserAvatarComponentController implements IUserAvatarComponentBindings {
  public imageToken?: string;
  public profileImageUrl: string;

  public $onInit = (): void => {
    if (this.imageToken) {
      this.profileImageUrl = this.urlService.resolveFileUrl(this.imageToken);
    } else {
      this.profileImageUrl = '/assets/images/no-avatar.jpg';
    }
  };

  public $onChanges = (): void => {
    if (this.imageToken) {
      this.profileImageUrl = this.urlService.resolveFileUrl(this.imageToken);
    } else {
      this.profileImageUrl = '/assets/images/no-avatar.jpg';
    }
  };

  public static $inject = ['urlService'];

  constructor(private urlService: UrlService) {}
}

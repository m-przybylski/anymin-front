import {UrlService} from '../../../services/url/url.service'
import {IUserAvatarComponentBindings} from './user-avatar'

export class UserAvatarComponentController implements IUserAvatarComponentBindings {

  public imageToken?: string
  public profileImageUrl: string

  $onInit = () => {
    if (this.imageToken) {
      this.profileImageUrl = this.urlService.resolveFileUrl(this.imageToken)
    } else {
      this.profileImageUrl = '/assets/images/no-avatar.jpg'
    }
  }

  $onChanges = () => {
    if (this.imageToken) {
      this.profileImageUrl = this.urlService.resolveFileUrl(this.imageToken)
    } else {
      this.profileImageUrl = '/assets/images/no-avatar.jpg'
    }
  }

  /* @ngInject */
  constructor(private urlService: UrlService) {
  }
}

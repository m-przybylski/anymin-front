import {UrlService} from '../../../services/url/url.service'
import {IUserAvatarComponentBindings} from './user-avatar'

export class UserAvatarComponentController implements IUserAvatarComponentBindings {

  public imageToken?: string
  public profileImageUrl: string

  $onInit = () => {
    if (this.imageToken) {
      this.profileImageUrl = this.urlService.resolveFileUrl(this.imageToken)
    } else {
      this.profileImageUrl = 'no-image'
    }
  }

  /* @ngInject */
  constructor(private urlService: UrlService) {
  }
}

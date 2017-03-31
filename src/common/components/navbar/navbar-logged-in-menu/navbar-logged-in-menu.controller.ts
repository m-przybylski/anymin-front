import {INavbarLoggedInMenuComponentBindings} from './navbar-logged-in-menu'
import {SessionService} from '../../../services/session/session.service'
import {UserService} from '../../../services/user/user.service'

export class NavbarLoggedInMenuComponentController implements INavbarLoggedInMenuComponentBindings {

  isExpert: boolean

  /* @ngInject */
  constructor(private sessionService: SessionService, private userService: UserService,
              private $state: ng.ui.IStateService) {
    this.setIsExpert()
  }

  public logout = () => {
    this.sessionService.logout().then(() => {
      this.$state.reload()
    })
  }

  private setIsExpert = () => {
    this.userService.getUser().then((response) => {
      this.isExpert = response.isExpert
    }, () => {
      this.isExpert = false
    })
  }

}

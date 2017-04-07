import {INavbarLoggedInMenuComponentBindings} from './navbar-logged-in-menu'
import {UserService} from '../../../services/user/user.service'
import {TopAlertService} from '../../../services/top-alert/top-alert.service'
import {IStateService} from 'angular-ui-router'

export class NavbarLoggedInMenuComponentController implements INavbarLoggedInMenuComponentBindings {

  isExpertOrOrganization: boolean

  /* @ngInject */
  constructor(private userService: UserService, private $filter: ng.IFilterService,
              private topAlertService: TopAlertService, private $state: IStateService) {
    this.setIsExpert()
  }

  public logout = () => {
    this.userService.logout().then(() => {
      this.$state.reload()
      this.topAlertService.success({
        message: this.$filter('translate')('LOGIN.SUCCESSFUL_LOGOUT'),
        timeout: 2
      })
    })
  }

  private setIsExpert = () => {
    this.userService.getUser().then((response) => {
      this.isExpertOrOrganization = response.isExpert || response.isCompany
    }, () => {
      this.isExpertOrOrganization = false
    })
  }

}

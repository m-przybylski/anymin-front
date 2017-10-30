import {EmploymentApi} from 'profitelo-api-ng/api/api'
import {GetProfileDetailsWithEmployments} from 'profitelo-api-ng/model/models';
import {UserService} from '../../../../common/services/user/user.service'
import {ModalsService} from '../../../../common/services/modals/modals.service'

export class DashboardExpertEmployeesController {

  public profilesWithEmployments: GetProfileDetailsWithEmployments[]
  public isLoading: boolean = true
  public isError: boolean = false
  public areEmployees: boolean = false

  /* @ngInject */
  constructor(private EmploymentApi: EmploymentApi,
              private userService: UserService,
              private modalsService: ModalsService,
              private $log: ng.ILogService) {
  }

  $onInit = (): void => {
    this.getProfilesWithEmployments()
  }

  public getProfilesWithEmployments = (): void => {
    this.userService.getUser().then(user => {
      this.EmploymentApi.getEmployeesRoute().then(profilesWithEmployments => {
        this.profilesWithEmployments = profilesWithEmployments.filter(profileWithEmployments =>
          profileWithEmployments.expertProfile.id !== user.id
        )
        this.areEmployees = this.profilesWithEmployments.length > 0
      }).catch((error) => {
        this.isError = true
        this.$log.error('Cannot load data', error)
      }).finally(() => {
        this.isLoading = false
      })
    })
  }

  public openInviteEmployeesModal = (): void => {
    this.modalsService.createExpertInviteEmployeesModal()
  }

  public areEmployeesAfterDelete = (): void => {
    this.areEmployees = this.profilesWithEmployments.length - 1 > 0
  }

}

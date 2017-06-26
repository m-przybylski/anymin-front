import { Tag } from 'profitelo-api-ng/model/models'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import {GetProfileWithServicesEmployments,
  GetServiceWithEmployments} from 'profitelo-api-ng/model/models'

export interface IInvitationsModalScope extends ng.IScope {
  profileWithServiceEmployments?: GetProfileWithServicesEmployments
}

export class InvitationsModalController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public areInvitations: boolean = true

  public companyName?: string
  public logo?: string
  public description?: string
  public services?: GetServiceWithEmployments[]

  public onModalClose = () => {
    this.$state.go('app.home')
  }

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService,
              $scope: IInvitationsModalScope) {
    if ($scope.profileWithServiceEmployments && $scope.profileWithServiceEmployments.organizationDetails) {
      this.companyName = $scope.profileWithServiceEmployments.organizationDetails.name
      this.logo = $scope.profileWithServiceEmployments.organizationDetails.logo
      this.description = $scope.profileWithServiceEmployments.organizationDetails.description
      this.services = $scope.profileWithServiceEmployments.services
    } else {
      this.areInvitations = false
    }
  }

}

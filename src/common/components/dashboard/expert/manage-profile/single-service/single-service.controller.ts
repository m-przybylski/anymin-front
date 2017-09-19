import {ISingleServiceComponentBindings} from './single-service'
import {GetExpertServiceDetails} from 'profitelo-api-ng/model/models';
import {UserService} from '../../../../../services/user/user.service'

export interface ISingleServiceComponentControllerScope extends ng.IScope {
  service: GetExpertServiceDetails
}

export class SingleServiceComponentController implements ng.IController, ISingleServiceComponentBindings {

  public service: GetExpertServiceDetails
  public isExpertOwnerOfService: boolean
  public serviceName: string
  public serviceOwnerName: string
  public serviceOwnerLogo: string

  /* @ngInject */
  constructor(private userService: UserService) {}

  $onInit = (): void => {
    this.serviceName = this.service.service.name
    if (this.service.ownerProfile.organizationDetails) {
      this.serviceOwnerName = this.service.ownerProfile.organizationDetails.name
      this.serviceOwnerLogo = this.service.ownerProfile.organizationDetails.logo
    }
    this.userService.getUser().then((user) => {
      this.isExpertOwnerOfService = user.id === this.service.ownerProfile.id
    })
  }

}

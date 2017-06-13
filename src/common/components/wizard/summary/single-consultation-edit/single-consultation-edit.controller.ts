import {ISingleConsultationEditComponentBindings} from './single-consultation-edit'
import {WizardService, WizardTag, MoneyDto} from 'profitelo-api-ng/model/models'
import {ServiceInvitation} from '../../../../models/ServiceInvitation'

export class SingleConsultationEditComponentController implements ISingleConsultationEditComponentBindings {

  public service: WizardService
  public tagsList: WizardTag[]
  public employeeList?: ServiceInvitation[]
  public name: string
  public price: MoneyDto
  public isEmployee: boolean
  /* @ngInject */
  constructor() {
  }

  $onInit() {
    this.isEmployee = !!(this.service.invitations && this.service.invitations.length > 0)
    this.tagsList = this.service.tags
    this.employeeList = this.service.invitations
    this.name = this.service.name
    this.price = this.service.price
  }
}

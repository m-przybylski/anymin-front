import {ISingleConsultationEditComponentBindings} from './single-consultation-edit'
import {WizardService, WizardTag, MoneyDto} from 'profitelo-api-ng/model/models'
import {ServiceInvitation} from '../../../../models/ServiceInvitation'

export class SingleConsultationEditComponentController implements ISingleConsultationEditComponentBindings {

  public service: WizardService
  public tagsList: WizardTag[]
  public employeeList: ServiceInvitation[]
  public name: string
  public price: MoneyDto
  public onRemove: (service: WizardService) => void
  public onEdit: (service: WizardService) => void
  public isOwnerEmployee: boolean = false
  public isCompany: boolean
  /* @ngInject */
  constructor() {
  }

  $onInit(): void {
    this.tagsList = this.service.tags
    this.employeeList = []
    if (this.service.invitations) {
      this.service.invitations.forEach((invitation) => {
        if (invitation.email) {
          this.employeeList.push(invitation.email)
        } else if (invitation.msisdn) {
          this.employeeList.push(invitation.msisdn)
        }
      })
    }
    this.name = this.service.name
    this.price = this.service.price
    this.isOwnerEmployee = this.service.isOwnerEmployee

  }

  public removeConsultation = (): void => {
    if (this.onRemove && typeof this.onRemove === 'function') {
      this.onRemove(this.service)
    }
  }

  public editConsultation = (): void => {
    if (this.onEdit && typeof this.onEdit === 'function') {
      this.onEdit(this.service)
    }
  }

}

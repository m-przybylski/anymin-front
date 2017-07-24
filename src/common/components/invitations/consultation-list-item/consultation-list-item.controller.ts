import {IConsultationListItemComponentBindings} from './consultation-list-item'
import { GetServiceWithEmployments, Tag } from 'profitelo-api-ng/model/models'
import {MoneyDto} from 'profitelo-api-ng/model/models'

export class ConsultationListItemComponentController implements IConsultationListItemComponentBindings {

  public service: GetServiceWithEmployments
  public onChange: (service: GetServiceWithEmployments, isChecked: boolean) => void
  public title: string
  public price: MoneyDto
  public tags: Array<Tag>
  public inviteTime: string
  public checkboxId: string
  public isChecked: boolean = false

  /* @ngInject */
  constructor() {
  }

  $onInit(): void {
    this.title = this.service.name
    this.price = this.service.price
    this.tags = []
    this.checkboxId = new Date().getTime() +  this.title
  }

  public changeConsultationStatus = (): void => {
    this.onChange(this.service, this.isChecked)
  }

}

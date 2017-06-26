import {IConsultationListItemComponentBindings} from './consultation-list-item'
import { Tag } from 'profitelo-api-ng/model/models'
import {MoneyDto} from 'profitelo-api-ng/model/models'

export class ConsultationListItemComponentController implements IConsultationListItemComponentBindings {

  public consultationTitle: string
  public consultationPrice: MoneyDto
  public consultationTags: Array<Tag>
  public consultationInviteTime: string
  public consultationCheckboxId: string = 'mockId'
  public consultationCheckboxNgModel: boolean = false

  /* @ngInject */
  constructor() {}

  public changeConsultationStatus = (): void => {
    this.onChange()
  }

}

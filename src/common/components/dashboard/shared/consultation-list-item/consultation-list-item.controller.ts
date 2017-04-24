import {IConsultationListItemComponentBindings} from './consultation-list-item'
import { Tag } from 'profitelo-api-ng/model/models'

export class ConsultationListItemComponentController implements IConsultationListItemComponentBindings {

  consultationTitle: string
  consultationPrice: string
  consultationTags: Array<Tag>
  consultationInviteTime: string
  public consultationCheckboxId: string = 'mockId'
  public consultationCheckboxNgModel: boolean = false

  /* @ngInject */
  constructor() {}

}

import {IConsultationEmployeeInputBindings} from './consultation-employee-input'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

export class ConsultationEmployeeInputComponentController implements IConsultationEmployeeInputBindings {
  public addedItemsList: string[] = []
  public inputModel: string
  private mailRegexp: RegExp
  private numberRegexp: RegExp
  public isOwnerEmployee: boolean

  /* @ngInject */
  constructor(CommonSettingsService: CommonSettingsService) {
    this.mailRegexp = CommonSettingsService.localSettings.mailPattern
    this.numberRegexp = CommonSettingsService.localSettings.phonePattern
  }

  public onEnter = () => {
    if (this.inputModel.length > 0 && !(this.addedItemsList.indexOf(this.inputModel) !== -1) &&
      (this.mailRegexp.test(this.inputModel) || this.numberRegexp.test(this.inputModel))) {
      this.addedItemsList.push(this.inputModel)
      this.inputModel = ''
    }
  }

  public deleteSelectedItem = (index: number) => {
    this.addedItemsList.splice(index, 1)
  }

}

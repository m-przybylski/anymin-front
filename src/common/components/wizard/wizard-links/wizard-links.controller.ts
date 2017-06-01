import {IWizardLinksComponentBindings} from './wizard-links'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

export class WizardLinksComponentController implements IWizardLinksComponentBindings, ng.IController {

  public selectedLinks: Array<string> = []
  public linkModel: string
  public urlPattern: any
  public badUrl: boolean = false
  public urlExist: boolean = false
  public noUrl: boolean = false

  private httpAdded: boolean = false
  /* @ngInject */
  constructor(CommonSettingsService: CommonSettingsService) {
    this.urlPattern = CommonSettingsService.localSettings.urlPattern
  }

  $onInit() {

  }

  public removeLink = (linkToDelete: string) => {
    const index = this.selectedLinks.indexOf(linkToDelete)
    this.selectedLinks.splice(index, 1)
  }

  public checkLinkExist = (link: string) => {
    return this.selectedLinks.indexOf(link) !== -1
  }
  public onEnter = () => {
    this.urlExist = false
    if (!this.linkModel.match(this.urlPattern) && this.httpAdded === false) {
      this.linkModel = 'http://' + this.linkModel
      this.httpAdded = true
    }

    if (this.urlPattern.test(this.linkModel)) {
      this.badUrl = false
      this.httpAdded = false
      if (this.checkLinkExist(this.linkModel)) {
        this.urlExist = true
      } else {
        this.selectedLinks.push(this.linkModel)
        this.linkModel = ''
      }
    } else {
      this.badUrl = true
      this.noUrl = false

    }
  }

}

import {IInputLinksComponentBindings} from './input-links'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

export class InputLinksComponentController implements IInputLinksComponentBindings, ng.IController {

  public selectedLinks: string[] = []
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

  $onInit(): void {

  }

  public removeLink = (linkToDelete: string): void => {
    const index = this.selectedLinks.indexOf(linkToDelete)
    this.selectedLinks.splice(index, 1)
  }

  public checkLinkExist = (link: string): boolean => this.selectedLinks.indexOf(link) !== -1

  public onAddLink = (): void => {
    this.urlExist = false
    if (!this.linkModel.match(this.urlPattern) && this.httpAdded === false) {
      this.linkModel = 'http://' + this.linkModel.toLowerCase()
      this.httpAdded = true
    }

    if (this.urlPattern.test(this.linkModel)) {
      this.badUrl = false
      this.httpAdded = false
      if (this.checkLinkExist(this.linkModel)) {
        this.urlExist = true
      } else {
        this.selectedLinks.push(this.linkModel.toLowerCase())
        this.linkModel = ''
      }
    } else {
      this.badUrl = true
      this.noUrl = false

    }
  }

}

import {NavbarAvailbilityComponentService} from './navbar-availbility.service'
import {GetExpertVisibility} from 'profitelo-api-ng/model/models'
import {ErrorHandlerService} from '../../../services/error-handler/error-handler.service'

interface IRadioModel {
  name: GetExpertVisibility.VisibilityEnum
}

export interface IWebSocketChange {
  status: GetExpertVisibility.VisibilityEnum
}

export class NavbarAvailbilityComponentController implements ng.IController {

  public callback: () => void
  public isOpen: boolean = false
  public isVisiblePresentsChecked: boolean

  public radioModel: IRadioModel = {
    name: GetExpertVisibility.VisibilityEnum.Visible
  }

  /* @ngInject */
  constructor(private $scope: ng.IScope,
              private $element: ng.IRootElementService,
              private $document: ng.IDocumentService,
              private errorHandler: ErrorHandlerService,
              private navbarAvailbilityComponentService: NavbarAvailbilityComponentService) {

    navbarAvailbilityComponentService.onChangeWebsocket(this.changeWebsocket)
  }

  $onInit = (): void => {
    this.$document.bind('click', (event: Event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked)
        this.isOpen = false

      this.$scope.$apply()
    })

    this.setExpertVisibleStatus()
  }

  private changeWebsocket = (data: IWebSocketChange): void => {
    this.radioModel.name = data.status
    this.isVisiblePresentsChecked = data.status === GetExpertVisibility.VisibilityEnum.Visible
  }

  private setExpertVisibleStatus = (): void => {
    this.navbarAvailbilityComponentService.getExpertVisibilityRoute().then((res: GetExpertVisibility): void => {
      this.radioModel.name = res.visibility
      this.isVisiblePresentsChecked = res.visibility === GetExpertVisibility.VisibilityEnum.Visible
    }, (error: any) => this.errorHandler.handleServerError(error))
  }

  $onDestroy = (): void => {
    this.$document.unbind('click')
  }

  public toggleButton = (): void => {
    this.isOpen = !this.isOpen
  }

  public selectVisibleOption = (): void => {
    this.navbarAvailbilityComponentService.setExpertPresenceVisible()
    this.isVisiblePresentsChecked = true
  }

  public selectInvisibleOption = (): void => {
    this.navbarAvailbilityComponentService.setExpertPresenceInvisible()
    this.isVisiblePresentsChecked = false
  }
}

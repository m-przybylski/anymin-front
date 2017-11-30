import {IExpertPresenceUpdate, NavbarAvailbilityService} from './navbar-availbility.service'
import {GetExpertVisibility} from 'profitelo-api-ng/model/models'
import {ErrorHandlerService} from '../../../services/error-handler/error-handler.service'
import {Subscription} from 'rxjs/Subscription'

interface IRadioModel {
  name?: GetExpertVisibility.VisibilityEnum
}

export class NavbarAvailbilityComponentController implements ng.IController {

  public callback: () => void
  public isOpen: boolean = false
  public isVisible?: boolean
  public radioModel: IRadioModel = {
    name: undefined
  }
  public isLoading: boolean = true
  public isVisibilityPending = false
  private visibilitySubscription: Subscription
  private requestDelay: number = 8000

  /* @ngInject */
  constructor(private $scope: ng.IScope,
              private $element: ng.IRootElementService,
              private $document: ng.IDocumentService,
              private errorHandler: ErrorHandlerService,
              private $timeout: ng.ITimeoutService,
              private navbarAvailbilityService: NavbarAvailbilityService) {
  }

  $onInit = (): void => {
    this.$document.bind('click', (event: Event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked)
        this.isOpen = false

      this.$scope.$apply()
    })
    this.visibilitySubscription = this.navbarAvailbilityService.onVisibilityChange(this.changeWebsocket)

    this.setExpertVisibleStatus()
  }

  private changeWebsocket = (data: IExpertPresenceUpdate): void => {
    this.radioModel.name = data.status
    this.isVisible = data.status === GetExpertVisibility.VisibilityEnum.Visible
  }

  private setExpertVisibleStatus = (): void => {
    this.navbarAvailbilityService.getExpertVisibility().then((res: GetExpertVisibility): void => {
      this.radioModel.name = res.visibility
      this.isVisible = res.visibility === GetExpertVisibility.VisibilityEnum.Visible
      this.isLoading = false
    }).catch((error: any) => {
      const getVisibilityRequestDelay = this.requestDelay
      this.$timeout(() => {
        this.setExpertVisibleStatus()
        this.requestDelay += getVisibilityRequestDelay
      }, getVisibilityRequestDelay)
      this.isLoading = true
      this.errorHandler.handleServerError(error)
    })
  }

  $onDestroy = (): void => {
    this.$document.unbind('click')
    this.visibilitySubscription.unsubscribe()
  }

  public toggleButton = (): boolean =>
    this.isOpen = !this.isOpen

  public selectVisibleOption = (): void => {
    const currentVisibility = this.isVisible
    this.isVisible = true
    this.radioModel.name = GetExpertVisibility.VisibilityEnum.Visible
    this.isVisibilityPending = true

    this.navbarAvailbilityService.setExpertVisibile().catch((error) => {
      this.isVisible = currentVisibility
      this.radioModel.name = undefined
      this.errorHandler.handleServerError(error)
    }).finally(() => {
      this.isVisibilityPending = false
    })
  }

  public selectInvisibleOption = (): void => {
    const currentVisibility = this.isVisible
    this.isVisible = false
    this.radioModel.name = GetExpertVisibility.VisibilityEnum.Invisible
    this.isVisibilityPending = true

    this.navbarAvailbilityService.setExpertInvisibile().catch((error) => {
      this.isVisible = currentVisibility
      this.radioModel.name = undefined
      this.errorHandler.handleServerError(error)
    }).finally(() => {
      this.isVisibilityPending = false
    })
  }
}

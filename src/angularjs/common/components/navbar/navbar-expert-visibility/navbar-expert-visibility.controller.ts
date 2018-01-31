import { IExpertPresenceUpdate, NavbarExpertVisibilityService } from './navbar-expert-visibility.service';
import { GetExpertVisibility } from 'profitelo-api-ng/model/models';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { Subscription } from 'rxjs/Subscription';

export class NavbarExpertVisibilityComponentController implements ng.IController {

  public callback: () => void;
  public isOpen: boolean = false;
  public isVisible?: boolean;
  public radioModel: GetExpertVisibility.VisibilityEnum;
  public isLoading: boolean;
  public isVisibilityPending = false;
  private visibilitySubscription: Subscription;

  static $inject = ['$scope', '$element', '$document', 'errorHandler', 'navbarExpertVisibilityService'];

    constructor(private $scope: ng.IScope,
              private $element: ng.IRootElementService,
              private $document: ng.IDocumentService,
              private errorHandler: ErrorHandlerService,
              private navbarExpertVisibilityService: NavbarExpertVisibilityService) {
  }

  $onInit = (): void => {
    this.$document.bind('click', (event: Event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0;
      if (!ifTargetClicked)
        this.isOpen = false;

      this.$scope.$apply();
    });

    this.visibilitySubscription = this.navbarExpertVisibilityService.onVisibilityUpdate(this.changeVisibility);
    this.setExpertVisibleStatus();
  }

  private changeVisibility = (data: IExpertPresenceUpdate): void => {
    this.radioModel = data.status;
    this.isVisible = data.status === GetExpertVisibility.VisibilityEnum.Visible;
    this.isLoading = false;
  }

  private setExpertVisibleStatus = (): void => {
    this.isLoading = true;
    this.navbarExpertVisibilityService.getExpertVisibility().then((res: GetExpertVisibility): void => {
      this.radioModel = res.visibility;
      this.isVisible = res.visibility === GetExpertVisibility.VisibilityEnum.Visible;
      this.isLoading = false;
    }).catch((error: any) => {
      this.isLoading = true;
      this.errorHandler.handleServerError(error);
    });
  }

  $onDestroy = (): void => {
    this.$document.unbind('click');
    this.visibilitySubscription.unsubscribe();
  }

  public toggleButton = (): boolean =>
    this.isOpen = !this.isOpen

  public selectVisibleOption = (): void => {
    const currentVisibility = this.isVisible;
    const currentCheckedRadio = this.radioModel;
    this.isVisible = true;
    this.radioModel = GetExpertVisibility.VisibilityEnum.Visible;
    this.isVisibilityPending = true;

    this.navbarExpertVisibilityService.setExpertVisibile().catch((error) => {
      this.isVisible = currentVisibility;
      this.radioModel = currentCheckedRadio;
      this.errorHandler.handleServerError(error);
    }).finally(() => {
      this.isVisibilityPending = false;
    });
  }

  public selectInvisibleOption = (): void => {
    const currentVisibility = this.isVisible;
    const currentCheckedRadio = this.radioModel;

    this.isVisible = false;
    this.radioModel = GetExpertVisibility.VisibilityEnum.Invisible;
    this.isVisibilityPending = true;

    this.navbarExpertVisibilityService.setExpertInvisibile().catch((error) => {
      this.isVisible = currentVisibility;
      this.radioModel = currentCheckedRadio;
      this.errorHandler.handleServerError(error);
    }).finally(() => {
      this.isVisibilityPending = false;
    });
  }
}

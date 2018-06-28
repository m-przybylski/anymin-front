// tslint:disable:readonly-array
import { IBtnDropdownCallComponentBindings } from './btn-dropdown-call';
import { Config } from '../../../../../config';

// tslint:disable:member-ordering
export class BtnDropdownCallComponentController implements ng.IController, IBtnDropdownCallComponentBindings {
  public callback: () => void;
  public isOpen = false;
  public buttonText = '';
  public buttonClass: string;
  public isPlatformForExpert = Config.isPlatformForExpert;

  public static $inject = ['$scope', '$document', '$element'];

    constructor(private $scope: ng.IScope,
              private $document: ng.IDocumentService,
              private $element: ng.IRootElementService) {}

  public $onInit = (): void => {
    this.$document.bind('click', (event: Event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0;
      if (!ifTargetClicked) {
        this.isOpen = false;
      }
      this.$scope.$apply();
    });
  }

  public $onDestroy = (): void => {
    this.$document.unbind('click');
  }

  public toggleButton = (): boolean =>
    this.isOpen = !this.isOpen

  public onSelectItem = (): void => {
    this.isOpen = false;
    this.callback();
  }
}

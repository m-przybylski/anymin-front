import {IBtnDropdownComponentBindings} from './btn-dropdown'

export class BtnDropdownComponentController implements ng.IController, IBtnDropdownComponentBindings {
  public callback: () => void
  public isOpen: boolean = false
  public buttonText: string = ''
  public buttonClass: string

  /* @ngInject */
  constructor(private $scope: ng.IScope,
              private $document: ng.IDocumentService,
              private $element: ng.IRootElementService) {}

  $onInit = (): void => {
    this.$document.bind('click', (event: Event) => {
      const ifTargetClicked = this.$element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isOpen = false
      }
      this.$scope.$apply()
    })
  }

  $onDestroy = (): void => {
    this.$document.unbind('click')
  }

  public toggleButton = (): boolean =>
    this.isOpen = !this.isOpen

  public onSelectItem = (): void => {
    this.isOpen = false
    this.callback()
  }
}

import {IBtnDropdownComponentBindings} from './btn-dropdown'

export class BtnDropdownComponentController implements IBtnDropdownComponentBindings {
  public callback: () => void
  public isOpen: boolean = false
  public buttonText: string = ''
  public buttonClass: string

  /* @ngInject */
  constructor($scope: ng.IScope, $document: ng.IDocumentService, $element: ng.IRootElementService) {

    $document.bind('click', (event: Event) => {
      const ifTargetClicked = $element.find(event.target).length > 0
      if (!ifTargetClicked) {
        this.isOpen = false
      }
      $scope.$apply()
    })
  }

  public toggleButton = (): boolean =>
    this.isOpen = !this.isOpen

  public onSelectItem = (): void => {
    this.isOpen = false
    this.callback()
  }
}

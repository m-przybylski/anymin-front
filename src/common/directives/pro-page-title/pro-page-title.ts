import * as angular from 'angular'
import {IFilterService} from '../../services/filter/filter.service'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IDirective} from 'angular'

function pageTitleDirective($rootScope: IRootScopeService, $filter: IFilterService): IDirective<ng.IScope> {

  function linkFunction(_scope: ng.IScope, element: ng.IRootElementService, _attrs: ng.IAttributes): void {

    let pageTitle = ''

    function changePageTitle(text: string): void {
      element.text(text)
    }

    $rootScope.$on('prependTitle', (_event: ng.IAngularEvent, data: any) => {

      changePageTitle(data + ' - ' + pageTitle)

    })

    function traverseDownStates(data: any): void {

      pageTitle = ''
      let currentLevel = data

      while (typeof currentLevel === 'object' && Object.getPrototypeOf(currentLevel)) {

        if (currentLevel.hasOwnProperty('pageTitle')) {

          if (pageTitle.length > 0) {
            pageTitle += ' - '
          }

          pageTitle += $filter('translate')(currentLevel.pageTitle)
        }

        currentLevel = Object.getPrototypeOf(currentLevel)
      }

      changePageTitle(pageTitle)
    }

    $rootScope.$on('$stateChangeStart', (_event: ng.IAngularEvent, toState: ng.ui.IState, _toParams: {},
                                         _fromState: ng.ui.IState, _fromParams: {}, _error: any) => {
      traverseDownStates(toState.data)
    })

  }

  return {
    restrict: 'A',
    link: linkFunction
  }
}

angular.module('profitelo.directives.page-title', [
  'ui.router',
  'pascalprecht.translate'
])
  .directive('pageTitle', pageTitleDirective)

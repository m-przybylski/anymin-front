import * as angular from 'angular'

interface IGetHeightScope extends ng.IScope {
  getHeight: (height: string) => void
}

class GetHeight implements ng.IDirective<ng.IScope> {

  public restrict: string = 'A'
  public scope = {
    getHeight: '=?'
  }

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService) {
  }

  public link = (scope: IGetHeightScope, elem: ng.IRootElementService): void => {

    this.$timeout(() => {
      scope.getHeight(String(elem[0].clientHeight) + 'px')
    })

  }

  public static getInstance = (): ($timeout: ng.ITimeoutService) => GetHeight => {
    const instance = ($timeout: ng.ITimeoutService): GetHeight =>
      new GetHeight($timeout)
    instance.$inject = ['$timeout']
    return instance
  }

}

const getHeight = angular.module('profitelo.directives.getHeight', [])
.directive('getHeight', GetHeight.getInstance())
  .name

export default getHeight

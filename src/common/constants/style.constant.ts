namespace profitelo.constants.style {

  export interface IStyleConstant {
    NAVBAR_HEIGHT: number
  }

  class StyleConstant implements IStyleConstant {
    public readonly NAVBAR_HEIGHT = 80
  }

  angular.module('profitelo.constants.style', [])
  .constant('styleConstant', new StyleConstant())
}
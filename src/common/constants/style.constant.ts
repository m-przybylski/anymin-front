namespace profitelo.constants.style {

  export interface IStyleConstant {
    NAVBAR_HEIGHT: number
    DESKTOP_WINDOW_WIDTH: number
  }

  class StyleConstant implements IStyleConstant {
    public readonly NAVBAR_HEIGHT = 80
    public readonly DESKTOP_WINDOW_WIDTH = 1200
  }

  angular.module('profitelo.constants.style', [])
  .constant('styleConstant', new StyleConstant())
}

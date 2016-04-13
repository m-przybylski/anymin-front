function proAlert(){

  function linkFunction(scope, element, attr) {

  }


  return {
    templateUrl:  'directives/interface/pro-alert/pro-alert.tpl.html',
    restrict:     'E',
    replace:      true,
    link: linkFunction,
    scope: {
      proModel: '=',
      placeholder: '@',
      defaultValue: '@',
      header: '@',
      content: '@'
    }

  }
}






angular.module('profitelo.directives.interface.pro-alert', [])
  .directive('proAlert', proAlert)
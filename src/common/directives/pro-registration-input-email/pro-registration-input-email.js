function proProgressBox() {
  var vm = this
  return vm

}

angular.module('profitelo.directives.pro-registration-input-email', [])
.directive('proRegistrationInputEmail', (AppSettingsService) =>{
  function linkFn(scope, element) {
    scope.emailPattern = AppSettingsService.localSettings.emailPattern
    var _input = element.find('input')
    _input.bind('focus', () => {
      element.addClass('selected')
    })
    _input.bind('blur', () => {
      element.removeClass('selected')
    })
  }
  return {
    templateUrl:  'directives/pro-registration-input-email/pro-registration-input-email.tpl.html',
    restrict:     'A',
    scope:        { name:       '@',
                    labelIcon:  '@',
                    form:       '=',
                    inputValue: '='
                  },
    link:         linkFn
  }
})



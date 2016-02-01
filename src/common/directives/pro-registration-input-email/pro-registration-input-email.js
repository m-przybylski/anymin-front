function proProgressBox() {
  var vm = this
  return vm

}

angular.module('profitelo.directives.pro-registration-input-email', [])
.directive('proRegistrationInputEmail', (CommonSettingsService, RegistrationCheckApi) =>{
  function linkFn(scope, element) {
    scope.emailPattern = CommonSettingsService.localSettings.emailPattern
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
    scope:        { name:           '@',
                    labelIcon:      '@',
                    form:           '=',
                    inputValue:     '=',
                    pattern:        '=',
                    onBlurFunction: '&'
                  },
    link:         linkFn
  }
})



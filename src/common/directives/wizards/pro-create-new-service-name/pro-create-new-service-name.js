function proCreateNewServiceName($timeout, wizardSectionControlService) {

  function linkFunction(scope, element, attrs) {


    scope.saveSection = () => {
      console.log('save section: ', parseInt(scope.order, 10))
    }

    scope.config = {
      order:    parseInt(scope.order, 10),
      element:  element,
      queue:    scope.queue,
      save:     scope.saveSection,
      toggles: {
        show:         false,
        past:         false,
        beingEdited:  false
      }
    }

    wizardSectionControlService(scope.config)

  }

  return {
    replace: true,
    templateUrl: 'directives/wizards/pro-create-new-service-name/pro-create-new-service-name.tpl.html',
    scope: {
      queue:    '=',
      order:    '@',
      service:  '='
    },
    link: linkFunction
  }
}

angular.module('profitelo.directives.wizards.pro-create-new-service-name', [
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.api.profiles',
  'profitelo.services.wizardSectionControl'
])

  .directive('proCreateNewServiceName', proCreateNewServiceName)
function proCreateNewServiceIndustry(wizardSectionControlService) {

  function linkFunction(scope, element, attrs) {
    scope.industries = ['Prawo', 'Biznes', 'Medycyna', 'Motoryzacja', 'Budownictwo', 'Edukacja', 'AGD/RTV', 'Informatyka']
    scope.selectedIndustry = ''
    scope.selectIndustry = (industry) =>{
      if (scope.selectedIndustry===industry) {
        scope.selectedIndustry = ''
      }else {
        scope.selectedIndustry = industry
      }
    }


    scope.saveSection = () => {
      console.log('save section: ', parseInt(scope.order, 10))
    }

    let _isValid = () => {
      return scope.selectedIndustry !== ''
    }

    let _getModel = () => {
      return scope.selectedIndustry
    }

    let _setModel = (model) => {
      scope.selectedIndustry = angular.copy(model)
    }

    scope.config = {
      order:    parseInt(scope.order, 10),
      model:    scope.model,
      element:  element,
      queue:    scope.queue,
      save:     scope.saveSection,
      isValid:  _isValid,
      getModel: _getModel,
      setModel: _setModel,
      toggles: {
        show:         false,
        past:         false,
        beingEdited:  false
      }
    }

    wizardSectionControlService(scope.config)

  }
  return {
    replace:        true,
    templateUrl:    'directives/wizards/pro-create-new-service-industry/pro-create-new-service-industry.tpl.html',
    scope: {
      queue:    '=',
      order:    '@',
      service:  '='
    },
    link: linkFunction
  }

}

angular.module('profitelo.directives.wizards.pro-create-new-service-industry', [
])

.directive('proCreateNewServiceIndustry', proCreateNewServiceIndustry)


function proCreateNewServiceTag($http, $timeout, wizardSectionControlService, _) {

  function linkFunction(scope, element, attrs) {
    scope.loading = true
    scope.tags = ['VAT', 'Prawo finansowe', 'Księgowość', 'Prawo podatkowe', 'PIT', 'CIT', 'Biuro rachunkowe', 'Inwestycje']
    scope.model = {
      tagMap: new Object()
    }
    angular.forEach(scope.tags, (value, key) =>{
      scope.model.tagMap[value] = false
    })
    scope.selectTag = (tag) =>{
      scope.model.tagMap[tag] = !scope.model.tagMap[tag]
    }

    scope.saveSection = () => {
      console.log('save section: ', parseInt(scope.order, 10))
    }

    let _isValid = () => {
      let _valid = false
      angular.forEach(scope.tags, (value, key) =>{
        if (scope.model.tagMap[value] === true) {
          return _valid = true
        }
      })
      return _valid
    }

    let _getModel = () => {
      return scope.model
    }

    scope.loadData = () => {
      $timeout(() => {
        scope.loading = false
      }, 1000)
    }

    let _setModel = (model) => {
      scope.model = angular.copy(model)
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
      loadData: scope.loadData,
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
    templateUrl:    'directives/wizards/pro-create-new-service-tag/pro-create-new-service-tag.tpl.html',
    scope: {
      userProfile:  '=',
      queue:    '=',
      order:    '@',
      service:  '='
    },
    link: linkFunction
  }

}

angular.module('profitelo.directives.wizards.pro-create-new-service-tag', [
])

.directive('proCreateNewServiceTag', proCreateNewServiceTag)


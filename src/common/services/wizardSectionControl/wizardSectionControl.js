function wizardSectionControlService($rootScope, $timeout, $q) {

  return (config) => {

    let scope = $rootScope.$new(true)

    let _dismissEdit = () => {
      config.toggles.beingEdited = false
      $timeout(() => {
        config.queue.sectionBeingEdited = -1
      })
    }

    let _cancelEdit = () => {
      config.setModel(config._shadowModel)
      _dismissEdit()
    }

    scope.$on('cancelEditing', _cancelEdit)

    scope.$on('saveEditing', () => {
      if (config.queue.sectionBeingEdited === config.order) {
        config.save()
        _dismissEdit()
      }
    })

    let _validateSection = () => {
      $q.when(config.isValid()).then((isValid) => {
        $rootScope.$broadcast('sectionValidateResponse', {
          current: config.order,
          isValid: isValid
        })
      })
    }

    scope.$on('isSectionValid', _validateSection)

    scope.$watch(() => {
      return config.queue
    }, (newValue, oldValue) => {
      if (oldValue.currentActiveSection < newValue.currentActiveSection) {
        config.save()
      }

      config.toggles.show = angular.equals(newValue.currentActiveSection, config.order)
      config.toggles.past = newValue.currentActiveSection > config.order

    }, true)

    config.element.on('click', (event) => {
      if (config.toggles.past && config.queue.sectionBeingEdited === -1) {
        config.toggles.beingEdited = true
        config._shadowModel = angular.copy(config.getModel())
        $timeout(() => {
          config.queue.sectionBeingEdited = config.order
        })
      }
    })
  }
}


angular.module('profitelo.services.wizardSectionControl', [
]).service('wizardSectionControlService', wizardSectionControlService)

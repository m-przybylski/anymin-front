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

    scope.$on('saveSection', (event, currentSection) => {
      if (config.queue.sectionBeingEdited === config.order || currentSection === config.order) {
        config.save()
        _dismissEdit()
      }
    })

    let _validateSection = (event, data) => {
      if (config.order === data.section) {
        $q.when(config.isValid()).then((isValid) => {
          $rootScope.$broadcast('sectionValidateResponse', {
            current: config.order,
            isValid: isValid
          })
        })
      }
    }

    scope.$on('isSectionValid', _validateSection)

    scope.$watch(() => {
      return config.queue
    }, (newValue, oldValue) => {
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

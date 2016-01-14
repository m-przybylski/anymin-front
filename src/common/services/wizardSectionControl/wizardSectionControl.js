function wizardSectionControlService($rootScope, $timeout) {

  return (config) => {

    let scope = $rootScope.$new(true)

    let _cancelEdit = () => {
      config.toggles.beingEdited = false
      $timeout(() => {
        config.queue.sectionBeingEdited = -1
      })
    }

    scope.$on('cancelEditing', _cancelEdit)

    scope.$on('saveEditing', () => {
      if (config.queue.sectionBeingEdited === config.order) {
        config.save()
        _cancelEdit()
      }
    })

    scope.$watch(() => {
      return config.queue
    }, (newValue) => {
      config.toggles.show = angular.equals(config.queue.currentActiveSection, config.order)
      config.toggles.past = config.queue.currentActiveSection > config.order
    }, true)

    config.element.on('click', (event) => {
      if (config.toggles.past && config.queue.sectionBeingEdited === -1) {
        config.toggles.beingEdited = true
        $timeout(() => {
          config.queue.sectionBeingEdited = config.order
        })
      }
    })
  }
}


angular.module('profitelo.services.wizardSectionControl', [
]).service('wizardSectionControlService', wizardSectionControlService)

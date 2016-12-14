(function() {
  /* @ngInject */
  function controller() {

    console.log("wooho", this.value)
    this.click = (elo) => {
      console.log('artur pala', this.value, this.ngModel)
    }
    return this
  }

  const component = {
    bindings: {
      label: '@',
      name: '@',
      id: '@',
      ngModel: '=?',
      value: '@'
    },
    templateUrl: 'components/interface/radio/radio.tpl.html',
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.radio', [])
    .component('radioBtn', component)

}())




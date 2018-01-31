(function (): void {

  function controller(): void {
    const checkedItems: any[] = [];

    const refreshBindings = (): void => {
      if (!angular.isDefined(this.isDisabled)) {
        this.isDisabled = false;
      }

      if (!angular.isDefined(this.selectedItems)) {
        this.selectedItems = [];
      }

      if (!angular.isDefined(this.items)) {
        this.items = [];
      }

      _.forEach(this.selectedItems, (selectedItem) => {
        const item = _.find(this.items, (item: any) => item.id === selectedItem.id);
        if (item) {
          checkedItems.push(item);
        }
      });
    };

    this.$onInit = (): void => {
      refreshBindings();
    };

    this.$onChanges = (): void => {
      refreshBindings();
    };

    this.toggleItem = (item: any): void => {
      if (!this.isDisabled) {
        if (checkedItems.indexOf(item) === -1) {
          checkedItems.push(item);
        } else {
          checkedItems.splice(checkedItems.indexOf(item), 1);
        }
        this.onSelectChange(checkedItems);
      }
    };

    this.isChecked = (item: any): boolean => (checkedItems.indexOf(item) > -1);

    return this;
  }

  const component = {
    template: require('./multiselect.html'),
    bindings: {
      isDisabled: '<',
      items: '<',
      onSelectChange: '<',
      selectedItems: '<',
      field: '@',
      title: '@'
    },
    controller: [controller],
    controllerAs: '$ctrl'
  };

  angular.module('profitelo.components.interface.multiselect', [
    'pascalprecht.translate'
  ])
    .component('multiselect', component);

}());

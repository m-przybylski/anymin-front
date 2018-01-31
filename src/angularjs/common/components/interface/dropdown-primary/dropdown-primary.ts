import * as angular from 'angular';
import ValidationAlertModule from '../alert/validation-alert/validation-alert';
import { DropdownPrimaryComponent } from './dropdown-primary.component';

// TODO Refactor: https://git.contactis.pl/itelo/profitelo/issues/1052

export interface IDropdownItem {
  name: string;
  value: any | null;
}

export interface IDropdownPrimaryComponentBindings {
  label: string;
  inputPlaceholder: string;
  name: string;
  placeholder: string;
  mainList: IPrimaryDropdownListElement[];
  onSelectMain: (item: IDropdownItem) => void;
  selectedItem: IDropdownItem;
}

export interface IPrimaryDropdownListElement {
  name: string;
  value: any;
}

export interface IFilterBy {
  name: string;
}

const dropdownPrimaryModule = angular.module('profitelo.components.interface.dropdown-primary', [
  'pascalprecht.translate',
  ValidationAlertModule
])
.component('dropdownPrimary', new DropdownPrimaryComponent)
  .name;

export default dropdownPrimaryModule;

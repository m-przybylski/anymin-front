import * as angular from 'angular';

import {
  WidgetGeneratorComponent
} from '../../../../angular/shared/components/widget-generator/widget-generator.component';
import { downgradeComponent } from '@angular/upgrade/static';

const generateWidget = angular.module('profitelo.directives.generate-widget', [])
  .directive('generateWidget', downgradeComponent({component: WidgetGeneratorComponent}))
  .name;

export default generateWidget;

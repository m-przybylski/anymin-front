import { InjectionToken } from '@angular/core';

export const GENERATE_WIDGET_DATA = new InjectionToken<IGenerateWidgetData>('Generate Widget Data Token');

export interface IGenerateWidgetData {
  expertId: string;
  serviceId: string;
  widgetId: string;
}

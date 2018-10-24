import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum WidgetButtonType {
  FLOATING,
  STATIC,
  BANNER,
}

export const GENERATE_WIDGET_BUTTON_TYPE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => GenerateWidgetButtonTypeComponent),
  multi: true,
};

@Component({
  selector: 'plat-generate-widget-button-type',
  templateUrl: 'generate-widget-button-type.component.html',
  styleUrls: ['generate-widget-button-type.component.sass'],
  providers: [GENERATE_WIDGET_BUTTON_TYPE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
})
export class GenerateWidgetButtonTypeComponent implements ControlValueAccessor {
  public readonly buttons: ReadonlyArray<IWidgetButtonTypeConfig> = [
    {
      buttonType: WidgetButtonType.FLOATING,
      title: 'GENERATE_WIDGET_MODAL.CONTENT.BUTTON.FLOATING_TITLE',
      subtitle: 'GENERATE_WIDGET_MODAL.CONTENT.BUTTON.FLOATING_SUBTITLE',
      selected: '#floating-button-selected',
      notSelected: '#floating-button',
    },
    {
      buttonType: WidgetButtonType.STATIC,
      title: 'GENERATE_WIDGET_MODAL.CONTENT.BUTTON.STATIC_TITLE',
      subtitle: 'GENERATE_WIDGET_MODAL.CONTENT.BUTTON.STATIC_SUBTITLE',
      selected: '#button-selected',
      notSelected: '#button',
    },
  ];

  public focused?: WidgetButtonType;
  public buttonType: WidgetButtonType;
  public isDisabled: boolean;
  // tslint:disable-next-line:no-any
  private onModelChange: (obj?: any) => any;
  // tslint:disable-next-line:no-any
  private onTouch: (obj?: any) => any;

  public writeValue(buttonType: WidgetButtonType): void {
    this.buttonType = buttonType;
  }
  // tslint:disable-next-line:no-any
  public registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  // tslint:disable-next-line:no-any
  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onBlur(): void {
    this.focused = undefined;
  }

  public onFocus(value: WidgetButtonType): void {
    this.focused = value;
    this.onTouch();
  }

  public onChange(value: WidgetButtonType): void {
    this.buttonType = value;
    this.onModelChange(value);
  }
}

interface IWidgetButtonTypeConfig {
  buttonType: WidgetButtonType;
  title: string;
  subtitle: string;
  selected: string;
  notSelected: string;
}

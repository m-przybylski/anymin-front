// tslint:disable:no-any
import { Component, forwardRef } from '@angular/core';
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
    // {
    //   buttonType: WidgetButtonType.BANNER,
    //   title: 'GENERATE_WIDGET_MODAL.CONTENT.BUTTON.BANNER_TITLE',
    //   subtitle: 'GENERATE_WIDGET_MODAL.CONTENT.BUTTON.BANNER_SUBTITLE',
    //   imgSrc: '',
    // },
  ];

  public focused: WidgetButtonType | undefined;
  public buttonType: WidgetButtonType;
  public isDisabled: boolean;
  private onModelChange: (obj?: any) => any;
  private onTouch: (obj?: any) => any;

  public writeValue(buttonType: WidgetButtonType): void {
    this.buttonType = buttonType;
  }
  public registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
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

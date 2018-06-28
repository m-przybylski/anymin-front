// tslint:disable:strict-boolean-expressions
// tslint:disable:newline-before-return
// tslint:disable:curly
import { IInputComponentBindings } from './input';
import { keyboardCodes } from '../../../classes/keyboard';

type InputTypes = 'text' | 'tel' |'number';

// tslint:disable:member-ordering
export class InputComponentController implements IInputComponentBindings {
  private textType: InputTypes = 'text';
  private telType: InputTypes = 'tel';
  private numberType: InputTypes = 'number';

  public id: string;
  public name: string;
  public type = this.textType;
  public inputText = '';
  public placeholder: string;
  public validationText: string;
  public maxLength = '';
  public isValid: boolean;
  public ngRequired = false;
  public ngModel: string;
  public isFocus = false;
  public isDirty = false;
  public onChangeCallback?: (value: string) => void;
  public inputValueLength = 0;

  public static $inject = ['$element'];

    constructor(private $element: JQuery) {}

  public $onInit(): void {
    if (this.type === this.telType) {
      this.blockInvalidDigits([keyboardCodes.dotASCI, keyboardCodes.commaASCI, keyboardCodes.backspace,
        keyboardCodes.enter, keyboardCodes.zero, keyboardCodes.one,
        keyboardCodes.two, keyboardCodes.three, keyboardCodes.four, keyboardCodes.five, keyboardCodes.six,
        keyboardCodes.seven, keyboardCodes.eight, keyboardCodes.nine, keyboardCodes.arrowRight, keyboardCodes.arrowLeft
      ]);
    } else if (this.type === this.numberType) {
      this.blockInvalidDigits([keyboardCodes.dotASCI, keyboardCodes.commaASCI,
        keyboardCodes.dot, keyboardCodes.comma, keyboardCodes.backspace, keyboardCodes.enter,
        keyboardCodes.zero, keyboardCodes.one, keyboardCodes.two, keyboardCodes.three, keyboardCodes.four,
        keyboardCodes.five, keyboardCodes.six, keyboardCodes.seven, keyboardCodes.eight, keyboardCodes.nine,
        keyboardCodes.arrowRight, keyboardCodes.arrowLeft]);
    }
  }

  public blockInvalidDigits = (digitsCodes: number[]): void => {
    this.$element.find('input').bind('keypress keydown', (event) => {

      if (this.isKeyAllowed(digitsCodes, event) && this.isCtrlKeyAllowed(event)) {
        event.preventDefault();
      }
    });
  }

  public onInputChange = (value: string): void => {
    if (this.onChangeCallback)
      this.onChangeCallback(value);
  }

  public setInputValueLength = (inputValueLength: number): void => {
    this.inputValueLength = inputValueLength;
  }

  private isCtrlKeyAllowed = (event: JQueryKeyEventObject): boolean => !(event.ctrlKey || event.metaKey);

  private isKeyAllowed = (digitsCodes: number[], event: JQueryKeyEventObject): boolean => {
    const code = event.keyCode || event.which;
    return digitsCodes.indexOf(code) === -1;
  }

  public $onDestroy = (): void => {
    this.$element.find('input').unbind('keypress');
  }

  public onFocus = (): void => {
    this.isFocus = true;
    this.isDirty = true;
  }

  public onBlur = (): void => {
    this.isFocus = false;
  }
}

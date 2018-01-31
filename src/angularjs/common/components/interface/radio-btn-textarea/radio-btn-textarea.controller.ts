import { IRadioBtnTextareaBindings } from './radio-btn-textarea';

export class RadioBtnTextareaComponentController implements IRadioBtnTextareaBindings {

  public id: string;
  public name: string;
  public value: string;
  public label: string;
  public ngModel: string;
  public onSelectedItem: (value: string) => void;
  public checkedItem: string;
  public description: string;
  public isTextarea: boolean;
  public onDescriptionCallback: (description: string) => string;

  static $inject = [];

  constructor() {}

  $onInit(): void {
  }

  public onClick = (selectedItem: string): void =>
    this.onSelectedItem(selectedItem)

  public onDescriptionChange = (description: string): string =>
    this.onDescriptionCallback(description)
}

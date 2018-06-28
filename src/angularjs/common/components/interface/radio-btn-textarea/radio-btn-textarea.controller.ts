// tslint:disable:curly
import { IRadioBtnTextareaBindings } from './radio-btn-textarea';

// tslint:disable:member-ordering
export class RadioBtnTextareaComponentController implements IRadioBtnTextareaBindings {

  public id: string;
  public name: string;
  public value: string;
  public label: string;
  public ngModel: string;
  public onSelectedItem: (value: string) => void;
  public checkedItem?: string;
  public description: string;
  public isTextarea: boolean;
  public onDescriptionCallback: (description: string) => string;

  public static $inject = [];

  constructor() {
  }

  public $onInit(): void {
    if (typeof this.checkedItem === 'string' && this.checkedItem.length > 0 && this.checkedItem === this.id)
      this.ngModel = this.checkedItem;
  }

  public onClick = (selectedItem: string): void =>
    this.onSelectedItem(selectedItem)

  public onDescriptionChange = (description: string): string =>
    this.onDescriptionCallback(description)
}

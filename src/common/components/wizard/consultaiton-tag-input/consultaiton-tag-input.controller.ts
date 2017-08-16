import {IConsultationTagInputBindings} from './consultaiton-tag-input'

export class ConsultationTagInputComponentController implements IConsultationTagInputBindings {
  public selectedTags: string[] = []
  public dictionary: string[]
  public tagModel: string
  public isValid?: boolean
  public validationText?: string
  public isDirty: boolean
  public isFocus: boolean
  public isInputValueInvalid: boolean
  public isSubmitted: boolean
  /* @ngInject */
  constructor() {}

  public onEnter = (): void => {
    if (this.tagModel.length > 0 && !(this.selectedTags.indexOf(this.tagModel) !== -1)) {
      this.selectedTags.push(this.tagModel)
      this.isInputValueInvalid = false
      this.tagModel = ''
    } else {
      this.isInputValueInvalid = true
    }
  }

  public addSelectedItem = (item: string, index: number): void => {
    this.selectedTags.push(item)
    this.isInputValueInvalid = false
    this.dictionary.splice(index, 1)
  }

  public onBlur = (): void => {
    this.isDirty = true
    this.isFocus = false
    this.isInputValueInvalid = false
  }

  public onFocus = (): void => {
    this.isFocus = true
  }

  public deleteSelectedItem = (index: number): void => {
    this.selectedTags.splice(index, 1)
  }
}

import {ITextareaComponentBindings} from './textarea'

export class TextareaComponentController implements ITextareaComponentBindings {
  public id: string
  public name: string
  public inputText: string = ''
  public placeholder: string
  public alertText: string
  public maxLength: string = ''
  public ngModel: boolean = false

  /* @ngInject */
  constructor() {}
}

import {IConsultationTagInputBindings} from './cosnultaiton-tag-input'

export class ConsultationTagInputComponentController implements IConsultationTagInputBindings {
  public selectedTags: string[] = []
  public dictionary: string[]
  public tagModel: string

  /* @ngInject */
  constructor() {}

  public onEnter = () => {
    if (this.tagModel.length > 0 && !(this.selectedTags.indexOf(this.tagModel) !== -1)) {
      this.selectedTags.push(this.tagModel)
      this.tagModel = ''
    }
  }

  public addSelectedItem = (item: string, index: number) => {
    this.selectedTags.push(item)
    this.dictionary.splice(index, 1)
  }

  public deleteSelectedItem = (index: number) => {
    this.selectedTags.splice(index, 1)
  }
}

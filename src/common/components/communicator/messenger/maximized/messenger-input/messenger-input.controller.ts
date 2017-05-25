import {IMessengerInputBindings} from './messenger-input'

export class MessengerInputComponentController implements IMessengerInputBindings {

  public onSendMessage: (text: string) => void
  public onUploadFiles: (files: Array<File>) => void
  public onTyping: () => void
  public isFileUploading: boolean
  public inputModel: string = ''

  /* @ngInject */
  constructor() {
  }

  public sendMessage = (text: string) => {
    if (text !== '') {
      this.onSendMessage(text)
      this.inputModel = ''
    }
  }

  public uploadFiles = (files: Array<File>) => {
    if (!this.isFileUploading) {
      this.onUploadFiles(files)
    }
  }

  public onKeyup = (event: any) => {
    if (event.key !== 'Enter') {
      this.onTyping()
    }
  }
}

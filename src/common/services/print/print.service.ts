export class PrintService {

  private __container__: any
  private contentWindow: any

  constructor() {
  }

  private htmlPrintTemplate = (imgSrc: string) => {

    return '<html><head>' +
      '</head>' +
      '<body>' +
      '<img style="display: block; margin-left: auto; margin-right: auto" src=""' + imgSrc + '""/>' +
      '</body>'
  }

  private closePrint = () => {
    document.body.removeChild(this.__container__)
  }

  private setPrint = () => {
    this.contentWindow.__container__ = this
    this.contentWindow.onbeforeunload = this.closePrint
    this.contentWindow.onafterprint = this.closePrint
    this.contentWindow.focus() // Required for IE
    this.contentWindow.print()
  }

  public print = (imgSrc: string) => {
    const oHiddFrame = document.createElement('iframe')
    oHiddFrame.onload = this.setPrint
    oHiddFrame.style.visibility = 'hidden'
    oHiddFrame.style.position = 'fixed'
    oHiddFrame.style.right = '0'
    oHiddFrame.style.bottom = '0'
    oHiddFrame.src = this.htmlPrintTemplate(imgSrc)
    document.body.appendChild(oHiddFrame)
  }
}

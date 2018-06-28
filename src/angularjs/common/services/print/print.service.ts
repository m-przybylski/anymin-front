// tslint:disable:no-empty
// tslint:disable:no-any
// tslint:disable:member-ordering
// tslint:disable:member-ordering
export class PrintService {

  private __container__: any;
  private contentWindow: any;

  public static $inject = [];

  constructor() {
  }

  private htmlPrintTemplate = (imgSrc: string): string =>
    '<html><head>' +
      '</head>' +
      '<body>' +
      '<img style="display: block; margin-left: auto; margin-right: auto" src=""' + imgSrc + '""/>' +
      '</body>'

  private closePrint = (): void => {
    document.body.removeChild(this.__container__);
  }

  private setPrint = (): void => {
    this.contentWindow.__container__ = this;
    this.contentWindow.onbeforeunload = this.closePrint;
    this.contentWindow.onafterprint = this.closePrint;
    this.contentWindow.focus(); // Required for IE
    this.contentWindow.print();
  }

  public print = (imgSrc: string): void => {
    const oHiddFrame = document.createElement('iframe');
    oHiddFrame.onload = this.setPrint;
    oHiddFrame.style.visibility = 'hidden';
    oHiddFrame.style.position = 'fixed';
    oHiddFrame.style.right = '0';
    oHiddFrame.style.bottom = '0';
    oHiddFrame.src = this.htmlPrintTemplate(imgSrc);
    document.body.appendChild(oHiddFrame);
  }
}

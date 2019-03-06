import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: 'img[fileResizer]',
})
export class FileResizerDirective {
  @Output()
  public onLoadPreview = new EventEmitter<string>();

  private currentWidthSize: number;
  private currentHeightSize: number;

  constructor(private element: ElementRef) {}

  @HostListener('load', ['$event'])
  public onChangeUrl(): void {
    this.onLoadPreview.emit();
    this.getPreviewSizes();
  }

  public onPreviewZoom(zoomPercent: number): void {
    const oneHundred = 100;
    this.element.nativeElement.style.height = `${(this.currentHeightSize * zoomPercent) / oneHundred}px`;
    this.element.nativeElement.style.width = `${(this.currentWidthSize * zoomPercent) / oneHundred}px`;
    this.element.nativeElement.style.minHeight = `${(this.currentHeightSize * zoomPercent) / oneHundred}px`;
    this.element.nativeElement.style.minWidth = `${(this.currentWidthSize * zoomPercent) / oneHundred}px`;
  }

  private getPreviewSizes(): void {
    this.currentHeightSize = this.element.nativeElement.clientHeight;
    this.currentWidthSize = this.element.nativeElement.clientWidth;
  }
}

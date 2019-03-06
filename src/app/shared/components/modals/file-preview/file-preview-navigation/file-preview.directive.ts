import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Config } from '../../../../../../config';

@Directive({
  selector: 'img[brokenPreview]',
  host: {
    '[src]': 'src',
    '(error)': 'onError()',
  },
})
export class FilePreviewDirective {
  @Input()
  public src: string;

  @Output()
  public onImageError = new EventEmitter<void>();

  constructor(private element: ElementRef) {}

  public onError(): void {
    return this.markAsBroken();
  }

  private markAsBroken(): void {
    this.src = Config.assetsUrl.brokenImage;
    this.element.nativeElement.classList.add('image-broken');
    this.onImageError.emit();
  }
}

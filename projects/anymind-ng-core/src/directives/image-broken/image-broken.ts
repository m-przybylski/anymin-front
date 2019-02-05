import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'img[imageBroken]',
  host: {
    '[src]': 'src',
    '(error)': 'onError()',
  },
})
export class ImageBrokenDirective {
  @Input()
  public src: string;

  constructor(private element: ElementRef) {}

  public onError = (): void => this.markAsBroken();

  private markAsBroken = (): void => {
    this.element.nativeElement.classList.add('image-broken');
    this.src = `./assets/images/broken-image.svg`;
  };
}

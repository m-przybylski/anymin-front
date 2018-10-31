import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'img[imageBroken]',
  host: {
    '[src]': 'src',
    '(error)': 'onError()',
  },
})
export class UserAvatarDirective {
  @Input()
  public src: string;

  constructor(private element: ElementRef) {}

  public onError = (): void => this.markAsBroken();

  private markAsBroken = (): void => {
    if (this.src.length > 0) {
      this.src = `./assets/images/broken-image.svg`;
      this.element.nativeElement.classList.add('image-broken');
      this.element.nativeElement.style.padding = '8px';
    }
  };
}

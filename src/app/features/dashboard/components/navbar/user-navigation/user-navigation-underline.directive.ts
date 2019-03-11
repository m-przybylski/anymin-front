// tslint:disable:no-duplicate-imports
import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { animate, AnimationBuilder, keyframes, style } from '@angular/animations';
import { Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[userNavigationUnderlineDirective]',
})
export class UserNavigationUnderlineDirective implements AfterViewInit {
  @Input()
  public currentItem$: Observable<ElementRef | undefined>;
  private previousElementWidth = 0;
  private previousElementOffset = 0;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private element: ElementRef, private renderer: Renderer2, private animationBuilder: AnimationBuilder) {}

  public ngAfterViewInit(): void {
    this.currentItem$
      .pipe(distinctUntilChanged())
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(element => {
        this.createAnimation(element);
      });
  }

  public $onDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private createAnimation = (element?: ElementRef): void => {
    if (typeof element !== 'undefined') {
      this.renderer.addClass(this.element.nativeElement, 'visible');
      const elementWidth = element.nativeElement.clientWidth;
      const elementOffset = element.nativeElement.offsetLeft;
      if (this.previousElementWidth > 0) {
        const animation = this.animationBuilder.build([
          animate(
            '200ms ease-in-out',
            keyframes([
              style({
                width: `${this.previousElementWidth}px`,
                left: `${this.previousElementOffset}px`,
                offset: 0,
              }),
              style({ width: `${elementWidth}px`, left: `${elementOffset}px`, offset: 1 }),
            ]),
          ),
        ]);
        this.updatePreviousElementAttributes(elementWidth, elementOffset);
        const player = animation.create(element.nativeElement);
        player.play();

        return;
      }
      this.updatePreviousElementAttributes(elementWidth, elementOffset);
      this.element.nativeElement.style.left = `${elementOffset}px`;
      this.element.nativeElement.style.width = `${elementWidth}px`;

      return;
    }
    this.renderer.removeClass(this.element.nativeElement, 'visible');
  };

  private updatePreviousElementAttributes = (elementWidth: number, elementOffset: number): void => {
    this.previousElementWidth = elementWidth;
    this.previousElementOffset = elementOffset;
  };
}

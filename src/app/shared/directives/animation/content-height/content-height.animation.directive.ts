import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { animate, AnimationBuilder, keyframes, style } from '@angular/animations';
import { first, takeUntil } from 'rxjs/operators';
import {
  ContentHeightAnimationService
}
  from '../../../services/animation/content-height/content-height.animation.service';
import { Subject } from 'rxjs';

@Directive({
  selector: '[contentHeightAnimation]'
})
export class ContentHeightAnimateDirective implements AfterViewInit, OnDestroy {

  private currentHeight: string;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private element: ElementRef,
              private animationBuilder: AnimationBuilder,
              private contentHeightService: ContentHeightAnimationService) {
  }

  public ngOnDestroy(): void {
    this.contentHeightService.getPreviousHeight$().next(this.currentHeight);

    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngAfterViewInit(): void {
    this.currentHeight = this.getElementHeight();
    this.createAnimation(this.element.nativeElement);
    this.contentHeightService.getPreviousHeight$().next(this.currentHeight);
  }

  private createAnimation = (element: ElementRef): void => {
    this.contentHeightService.getPreviousHeight$()
      .pipe(first())
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(previousHeight => {
        if (previousHeight !== this.currentHeight) {

          const animation = this.animationBuilder.build([
            animate('300ms ease-in-out', keyframes([
              style({height: previousHeight, offset: 0}),
              style({height: '*', offset: 0.5}),
              style({height: 'auto', offset: 1})
            ]))
          ]);

          const player = animation.create(element);
          player.play();
        }
      });
  }

  private getElementHeight = (): string =>
    this.element.nativeElement.clientHeight

}

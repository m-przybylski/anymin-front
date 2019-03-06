import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { animate, AnimationBuilder, keyframes, style } from '@angular/animations';
import { first, takeUntil } from 'rxjs/operators';
import { ContentHeightAnimationService } from '../../../services/animation/content-height/content-height.animation.service';
import { Subject } from 'rxjs';
import { StickyModalFooterService } from '@platform/shared/components/modals/modal/animation/sticky-modal-footer.directive.service';
import { Config } from '../../../../../config';

@Directive({
  selector: '[contentHeightAnimation]',
})
export class ContentHeightAnimateDirective implements AfterViewInit, OnDestroy {
  private currentHeight: string;
  private timeDuration = Config.animationContentHeightTimeDuration;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private animationBuilder: AnimationBuilder,
    private stickyModalFooterService: StickyModalFooterService,
    private contentHeightService: ContentHeightAnimationService,
  ) {}

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

  private createAnimation(element: ElementRef): void {
    this.contentHeightService
      .getPreviousHeight$()
      .pipe(
        first(),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(previousHeight => {
        if (previousHeight !== this.currentHeight) {
          const animation = this.animationBuilder.build([
            animate(
              `${this.timeDuration}ms`,
              keyframes([
                style({ height: previousHeight, offset: 0 }),
                style({ height: '*', offset: 0.99 }),
                style({ height: 'auto', offset: 1 }),
              ]),
            ),
          ]);

          // hopefully they'll fix it in the newest version
          // https://github.com/angular/angular/issues/20585

          const player = animation.create(element);

          player.onStart(() => {
            this.stickyModalFooterService.pushAnimationEvent(Number(this.currentHeight));
          });

          player.onDone(() => {
            player.destroy();
          });

          player.play();
        }
      });
  }

  private getElementHeight(): string {
    return this.element.nativeElement.clientHeight;
  }
}

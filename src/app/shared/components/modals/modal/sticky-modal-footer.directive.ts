import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { WindowRef } from '@anymind-ng/core';
import { StickyModalFooterService } from '@platform/shared/components/modals/modal/animation/sticky-modal-footer.directive.service';
import { Subject, fromEvent } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { Config } from '../../../../../config';

@Directive({
  selector: '[stickyModalFooter]',
})
export class StickyFooterDirective implements AfterViewInit, OnDestroy {
  private static readonly contentHeightAnimationDelay = Config.animationContentHeightTimeDuration;

  @Input()
  public footerModalElement: HTMLElement;

  @Input()
  public modalContentElement: HTMLElement;

  private paddingTop: number;
  private windowHeight: number;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private stickyModalFooterService: StickyModalFooterService,
    private windowRef: WindowRef,
    private ngZone: NgZone,
  ) {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.element.nativeElement, 'scroll')
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          if (this.isAbleToBeFixed()) {
            this.markFooterElementAsFixed();
          }
        });
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngAfterViewInit(): void {
    this.stickyModalFooterService.newAnimationEvent$
      .pipe(
        delay(StickyFooterDirective.contentHeightAnimationDelay),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(() => {
        this.checkIsFooterFixed();
      });

    this.paddingTop = Number(
      this.windowRef.nativeWindow.getComputedStyle(this.element.nativeElement).paddingTop.replace('px', ''),
    );

    this.windowHeight = this.windowRef.nativeWindow.innerHeight;
  }

  private markFooterElementAsFixed = (): void => {
    this.addPositionFixedClassToFooter();
    this.modalContentElement.style.paddingBottom = `${this.footerModalElement.clientHeight - this.paddingTop}px`;
  };

  private checkIsFooterFixed = (): void => {
    if (this.isAbleToBeFixed()) {
      this.addPositionFixedClassToFooter();
    }
  };

  private addPositionFixedClassToFooter = (): void => {
    this.footerModalElement.classList.add('modal-component__footer--fixed');
  };

  private isAbleToBeFixed = (): boolean =>
    this.windowRef.nativeWindow.innerHeight < this.modalContentElement.clientHeight;
}

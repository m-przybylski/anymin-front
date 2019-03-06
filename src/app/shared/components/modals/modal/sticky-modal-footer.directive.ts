import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { WindowRef } from '@anymind-ng/core';
import { StickyModalFooterService } from '@platform/shared/components/modals/modal/animation/sticky-modal-footer.directive.service';
import { Subject, fromEvent } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Config } from '../../../../../config';

@Directive({
  selector: '[stickyModalFooter]',
})
export class StickyFooterDirective implements AfterViewInit, OnDestroy {
  @Input()
  public footerModalElement: HTMLElement;

  @Input()
  public modalContentElement: HTMLElement;

  public modalHeightAfterAnimation: number;
  private currentScrollTopHeight = 0;
  private paddingTop: number;
  private windowHeight: number;
  private ngUnsubscribe$ = new Subject<void>();
  private isAbleToMarkAsFixedAgain = false;

  constructor(
    private element: ElementRef,
    private stickyModalFooterService: StickyModalFooterService,
    private windowRef: WindowRef,
    private ngZone: NgZone,
  ) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngAfterViewInit(): void {
    if (this.isModalFooterExist()) {
      this.listenOnScroll();

      this.stickyModalFooterService.newAnimationEvent$
        .pipe(
          tap((height: number) => this.stickModalFooter(height)),
          takeUntil(this.ngUnsubscribe$),
        )
        .subscribe();

      this.paddingTop = Number(
        this.windowRef.nativeWindow.getComputedStyle(this.element.nativeElement).paddingTop.replace('px', ''),
      );
      this.windowHeight = this.windowRef.nativeWindow.innerHeight;
    }
  }

  private detectScrollOrientation(): void {
    if (this.element.nativeElement.scrollTop > this.currentScrollTopHeight) {
      if (this.element.nativeElement.scrollTop === this.getDownModalBreakPointValue()) {
        this.markFooterElementAsStatic();
        this.isAbleToMarkAsFixedAgain = true;
      }
      this.setCurrentScrollHeight();
    } else {
      if (this.element.nativeElement.scrollTop <= this.getDownModalBreakPointValue()) {
        if (this.isAbleToMarkAsFixedAgain) {
          this.markFooterElementAsFixed();
          this.element.nativeElement.scrollTop = this.getDownModalBreakPointValue();
          this.isAbleToMarkAsFixedAgain = false;
        }
      }
      this.setCurrentScrollHeight();
    }
  }

  private listenOnScroll(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.element.nativeElement, 'scroll')
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          if (this.isAbleToBeFixed() && this.isModalFooterExist()) {
            this.detectScrollOrientation();
          }
        });
    });
  }

  private setCurrentScrollHeight(): void {
    return (this.currentScrollTopHeight = this.element.nativeElement.scrollTop);
  }

  private getDownModalBreakPointValue(): number {
    return (
      this.modalHeightAfterAnimation -
      (this.windowHeight -
        this.footerModalElement.clientHeight -
        this.paddingTop -
        (this.footerModalElement.clientHeight - this.paddingTop))
    );
  }

  private stickModalFooter(modalHeight: number): void {
    this.modalHeightAfterAnimation = modalHeight;

    if (modalHeight !== 0 && this.isAbleToBeFixed()) {
      const halfDivider = 2;

      // It's space between modalContent and edge of screen before animation start
      const breakpointToFixFooter =
        this.windowRef.nativeWindow.innerHeight -
        (this.modalContentElement.clientHeight +
          this.footerModalElement.clientHeight +
          (this.footerModalElement.clientHeight - this.paddingTop)) /
          halfDivider;

      // It's counts time when ModalFooter touch down window edge during animation
      const timeDelay = (Config.animationContentHeightTimeDuration * breakpointToFixFooter) / modalHeight;

      setTimeout(() => {
        this.markFooterElementAsFixed();
      }, timeDelay);
    }
  }

  private markFooterElementAsFixed(): void {
    this.ngZone.run(() => {
      this.footerModalElement.classList.add('modal-component__footer--fixed');
      this.modalContentElement.style.paddingBottom = `${this.footerModalElement.clientHeight - this.paddingTop}px`;
    });
  }

  private markFooterElementAsStatic(): void {
    this.ngZone.run(() => {
      this.footerModalElement.classList.remove('modal-component__footer--fixed');
      this.modalContentElement.style.paddingBottom = '0px';
    });
  }

  private isAbleToBeFixed(): boolean {
    return (
      this.windowRef.nativeWindow.innerHeight - this.footerModalElement.clientHeight <= this.modalHeightAfterAnimation
    );
  }

  private isModalFooterExist(): boolean {
    return this.footerModalElement.childElementCount !== 0;
  }
}

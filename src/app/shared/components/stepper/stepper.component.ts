import { ContentChildren, Component, QueryList, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { StepComponent } from './step.component';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'plat-stepper',
  exportAs: 'platStepper',
  templateUrl: `stepper.component.html`,
  styleUrls: ['stepper.component.sass'],
  animations: [
    trigger('stepTransition', [
      state('previous', style({ transform: 'translate3d(-100%, 0, 0)' })),
      state('current', style({ transform: 'none' })),
      state('next', style({ transform: 'translate3d(100%, 0, 0)' })),
      transition('* => *', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)')),
    ]),
  ],
})
export class StepperComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(StepComponent)
  public steps: QueryList<StepComponent>;

  @Input()
  public set selectedIndex(index: number) {
    if (this.steps) {
      if (index < 0 || index > this.steps.length - 1) {
        return;
      }
    }
    this._selectedIndex = index;
  }
  public get selectedIndex(): number {
    return this._selectedIndex;
  }
  private _selectedIndex = 0;

  @Input()
  public get selected(): StepComponent | undefined {
    return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
  }
  public set selected(step: StepComponent | undefined) {
    if (step) {
      this.selectedIndex = this.steps ? this.steps.toArray().indexOf(step) : -1;
    }
  }

  private readonly destroyed$ = new Subject<void>();

  public next(): void {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
  }

  public previous(): void {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }

  public getAnimationState(index: number): AnimationState {
    const position = index - this._selectedIndex;
    if (position < 0) {
      return 'previous';
    } else if (position > 0) {
      return 'next';
    }

    return 'current';
  }

  public ngAfterViewInit(): void {
    this.steps.changes.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

type AnimationState = 'previous' | 'current' | 'next';

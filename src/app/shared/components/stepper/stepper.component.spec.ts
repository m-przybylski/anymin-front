// tslint:disable:no-magic-numbers
import { StepperComponent } from './stepper.component';
import { QueryList } from '@angular/core';
import { Deceiver } from 'deceiver-core';
import { of } from 'rxjs';

describe('StepperComponent', () => {
  const stepsArray: ReadonlyArray<any> = [{ content: 'asdf' }, { content: 'qwww' }];
  let stepperComponent: StepperComponent;
  let steps: QueryList<{ content: '' }>;
  beforeEach(() => {
    steps = Deceiver(QueryList, {
      changes: of(stepsArray),
      toArray: jest.fn().mockReturnValue(stepsArray),
      length: 2,
    }) as any;
    stepperComponent = new StepperComponent();
    stepperComponent.steps = steps as any;
  });

  it('should select first step after a hook', () => {
    stepperComponent.ngAfterViewInit();
    expect(stepperComponent.selected).toEqual({ content: 'asdf' } as any);
    expect(stepperComponent.selectedIndex).toEqual(0);
  });
  it('should be possible to set step from outside', () => {
    expect(stepperComponent.selected).toEqual({ content: 'asdf' } as any);
    expect(stepperComponent.selectedIndex).toEqual(0);
    stepperComponent.selected = stepsArray[1];
    expect(stepperComponent.selected).toEqual({ content: 'qwww' } as any);
    expect(stepperComponent.selectedIndex).toEqual(1);
  });
  it('should select next step when next is called', () => {
    stepperComponent.ngAfterViewInit();
    expect(stepperComponent.selected).toEqual({ content: 'asdf' } as any);
    expect(stepperComponent.selectedIndex).toEqual(0);
    stepperComponent.next();
    expect(stepperComponent.selected).toEqual({ content: 'qwww' } as any);
    expect(stepperComponent.selectedIndex).toEqual(1);
  });
  it('should not select next step when next is called at end of the list', () => {
    stepperComponent.ngAfterViewInit();
    stepperComponent.next();
    stepperComponent.next();
    expect(stepperComponent.selected).toEqual({ content: 'qwww' } as any);
    expect(stepperComponent.selectedIndex).toEqual(1);
  });
  it('should select previous step when possible', () => {
    stepperComponent.ngAfterViewInit();
    stepperComponent.next();
    stepperComponent.previous();
    expect(stepperComponent.selected).toEqual({ content: 'asdf' } as any);
    expect(stepperComponent.selectedIndex).toEqual(0);
  });
  it('should select previous step when possible', () => {
    stepperComponent.ngAfterViewInit();
    stepperComponent.previous();
    expect(stepperComponent.selected).toEqual({ content: 'asdf' } as any);
    expect(stepperComponent.selectedIndex).toEqual(0);
  });
  it('should get animatin state for every item in the que', () => {
    const stepsArrayThree: ReadonlyArray<any> = [{ content: 'asdf' }, { content: 'qwww' }, { content: 'aaaa' }];
    stepperComponent.steps = Deceiver(QueryList, {
      changes: of(stepsArrayThree),
      toArray: jest.fn().mockReturnValue(stepsArrayThree),
      length: 3,
    }) as any;
    stepperComponent.next();
    expect(stepperComponent.getAnimationState(0)).toBe('previous');
    expect(stepperComponent.getAnimationState(1)).toBe('current');
    expect(stepperComponent.getAnimationState(2)).toBe('next');
  });
});

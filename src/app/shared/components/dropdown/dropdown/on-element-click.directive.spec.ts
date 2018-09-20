import { ElementRef } from '@angular/core';
import { ToggleElementDirective } from './on-element-click.directive';
import { Deceiver } from 'deceiver-core';
import { fakeAsync } from '@angular/core/testing';

describe('Directive: ToggleElementDirective', () => {
  let element: ElementRef;
  let directive: ToggleElementDirective;

  beforeEach(() => {
    element = Deceiver(ElementRef, { nativeElement: { contains: jasmine.createSpy('contains') } });
    directive = new ToggleElementDirective(element);
  });

  it('should click on element', fakeAsync(() => {
    (element.nativeElement.contains as jasmine.Spy).and.returnValue(true);

    directive.isClickedElement.subscribe((val: boolean) => {
      expect(val).toEqual(true);
    });

    directive.handleClick({ event: true } as any);
  }));

  it('should unclick', fakeAsync(() => {
    (element.nativeElement.contains as jasmine.Spy).and.returnValue(false);

    directive.isClickedElement.subscribe((val: boolean) => {
      expect(val).toEqual(false);
    });

    directive.handleClick({ event: undefined } as any);
  }));
});

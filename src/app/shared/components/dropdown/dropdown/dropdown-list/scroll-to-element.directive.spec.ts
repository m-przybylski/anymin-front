import { Component, ElementRef } from '@angular/core';
import { ScrollToElementDirective } from './scroll-to-element.directive';
import { TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;

@Component({
  template: `
      <div scrollToElementDirective style="height: 200px;">
          <ul>
              <li id="item_1"></li>
              <li id="item_2"></li>
          </ul>
      </div>`,
})
class TestDirectiveComponent {}

describe('Directive: ScrollToElementDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, ScrollToElementDirective],
      providers: [
        {
          provide: ElementRef,
          useValue: createSpyObj('ElementRef', ['element']),
        },
      ],
    });
  });
});

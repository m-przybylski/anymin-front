import { Component, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { OnElementClickDirective } from './on-element-click.directive';

@Component({
  template: `
      <div onElementClickDirective style="height: 200px;">
          <ul>
              <li id="item_1"></li>
              <li id="item_2"></li>
          </ul>
      </div>`,
})
class TestDirectiveComponent {}

describe('Directive: OnElementClickDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, OnElementClickDirective],
      providers: [
        {
          provide: ElementRef,
          useValue: createSpyObj('ElementRef', ['element']),
        },
      ],
    });
  });
});

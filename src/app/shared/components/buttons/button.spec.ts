import { selectorBuilder, ButtonComponent } from './button';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<button plat-button></button>`,
})
class DummyComponent {}

describe('ButtonComponent', () => {
  const someArray = ['something1', 'something2'];
  const result = 'button[something1], [something1], button[something2], [something2]';

  it('should build selector', () => {
    expect(selectorBuilder(someArray)).toEqual(result);
  });

  describe('with template', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [DummyComponent, ButtonComponent],
      }).compileComponents();
    });

    it('should apply class to component', () => {
      const componentFixture = TestBed.createComponent(DummyComponent);
      const debugElement = componentFixture.debugElement;
      const button = debugElement.query(By.css('button'));
      const buttonHtml: HTMLButtonElement = button.nativeElement;
      expect(buttonHtml.classList.item(0)).toEqual('plat-button');
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ContentHeightAnimationService
}
  from '../../../services/animation/content-height/content-height.animation.service';
import createSpyObj = jasmine.createSpyObj;
import { ContentHeightAnimateDirective } from './content-height.animation.directive';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { AnimationBuilder, AnimationFactory } from '@angular/animations';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { AnimationPlayer } from '@angular/animations/src/players/animation_player';

@Component({
  template: `
      <div contentHeightAnimation style="height: 200px;"><span>SomeTestText</span></div>`
})

class TestDirectiveComponent {
}

describe('Directive: ContentHeightAnimateDirective', () => {

  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let directiveElement: DebugElement;
  const currentHeight = 200;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, ContentHeightAnimateDirective],
      providers: [
        {
          provide: ContentHeightAnimationService,
          useValue: createSpyObj('ContentHeightAnimationService', ['previousHeight$'])
        },
        {
          provide: AnimationBuilder, useValue: createSpyObj('AnimationBuilder', ['build'])
        },
        {
          provide: ElementRef, useValue: createSpyObj('ElementRef', ['element'])
        }
      ]
    });

    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.css('div'));
  });

  it('should create animation', () => {
    const contentHeightAnimationService = TestBed.get(ContentHeightAnimationService);
    contentHeightAnimationService.previousHeight$.and.returnValue(new Subject<string>());

    const animationBuilder = TestBed.get(AnimationBuilder);
    const playObject = {
      play: (): void => {
      }
    };

    animationBuilder.build = (): AnimationFactory => ({
      create: (): AnimationPlayer => <any>playObject
    });

    spyOn(playObject, 'play');
    fixture.detectChanges();

    expect(directiveElement.nativeElement.clientHeight).toBe(currentHeight);
    expect(playObject.play).toHaveBeenCalled();
  });

  it('should destroy lifecycle of directive', () => {
    fixture.destroy();
    expect(fixture.componentInstance).toBeDefined();
  });
});

// tslint:disable:no-empty
import { TestBed } from '@angular/core/testing';
import { ContentHeightAnimationService } from '../../../services/animation/content-height/content-height.animation.service';
import createSpyObj = jasmine.createSpyObj;
import { ContentHeightAnimateDirective } from './content-height.animation.directive';
import { Component, ElementRef } from '@angular/core';
import { AnimationBuilder, AnimationFactory } from '@angular/animations';
import { By } from '@angular/platform-browser';
import { AnimationPlayer } from '@angular/animations/src/players/animation_player';
import { BehaviorSubject } from 'rxjs';

@Component({
  template: `
    <div contentHeightAnimation style="height: 200px;"><span>SomeTestText</span></div>`,
})
class TestDirectiveComponent {}

describe('Directive: ContentHeightAnimateDirective', () => {
  const currentHeight = 200;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, ContentHeightAnimateDirective],
      providers: [
        {
          provide: ContentHeightAnimationService,
          useValue: createSpyObj('ContentHeightAnimationService', ['getPreviousHeight$']),
        },
        {
          provide: AnimationBuilder,
          useValue: createSpyObj('AnimationBuilder', ['build']),
        },
        {
          provide: ElementRef,
          useValue: createSpyObj('ElementRef', ['element']),
        },
      ],
    });
  });

  it('should play animation', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    const directiveElement = fixture.debugElement.query(By.css('div'));
    const contentHeightAnimationService = TestBed.get(ContentHeightAnimationService);
    contentHeightAnimationService.getPreviousHeight$.and.returnValue(new BehaviorSubject('23px'));

    const animationBuilder = TestBed.get(AnimationBuilder);
    const playObject = {
      play: (): void => {},
    };

    animationBuilder.build = (): AnimationFactory => ({
      create: (): AnimationPlayer => <any>playObject,
    });

    spyOn(playObject, 'play');
    fixture.detectChanges();

    expect(directiveElement.nativeElement.clientHeight).toBe(currentHeight);
    expect(playObject.play).toHaveBeenCalled();
  });
});

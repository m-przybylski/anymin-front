// tslint:disable:readonly-array
// tslint:disable:no-magic-numbers
import {
  trigger,
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  AnimationTriggerMetadata,
} from '@angular/animations';

export class Animations {
  public static alertContainerAnimation: AnimationTriggerMetadata[] = [
    trigger('animation', [
      transition(':enter', [
        animate(
          300,
          keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
          ]),
        ),
      ]),
      transition(':leave', [
        animate(
          300,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 1, offset: 0.5 }),
            style({ opacity: 0, height: '0px', offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ];

  public static validationAlertAnimation: AnimationTriggerMetadata[] = [
    trigger('animation', [
      transition(':enter', [
        animate(
          300,
          keyframes([
            style({ opacity: 0, transform: 'translateY(-16px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(4px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]),
        ),
      ]),
      transition(':leave', [
        animate(
          300,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 1, offset: 0.5 }),
            style({ opacity: 0, height: '0px', offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ];

  public static addItemAnimation: AnimationTriggerMetadata[] = [
    trigger('animation', [
      transition(':enter', [
        animate(
          300,
          keyframes([
            style({ opacity: 0, height: '0px', offset: 0 }),
            style({ opacity: 0, height: '*', transform: 'translateY(-8px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]),
        ),
      ]),
      transition(':leave', [
        animate(
          300,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, height: '*', offset: 0.5 }),
            style({ opacity: 0, height: '0px', offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ];

  public static preloaderAlertAnimation: AnimationTriggerMetadata[] = [
    trigger('animation', [
      transition(':enter', [
        animate(
          300,
          keyframes([
            style({ opacity: 0, transform: 'translateY(16px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(4px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]),
        ),
      ]),
      transition(':leave', [
        animate(
          300,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 1, offset: 0.5 }),
            style({ opacity: 0, height: '0px', offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ];

  public static animationByElement: AnimationTriggerMetadata[] = [
    trigger('animation', [
      transition('* => *', [
        query('img', style({ transform: 'translateX(-100%)' })),
        query('img', stagger('600ms', [animate('900ms', style({ transform: 'translateX(0)' }))])),
      ]),
    ]),
  ];

  public static slideInOut: AnimationTriggerMetadata[] = [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))]),
    ]),
  ];
}

// tslint:disable:readonly-array
import {
  animate,
  AnimationTriggerMetadata,
  query,
  stagger,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';

export class Animations {
  public static fadeInWithDelay: AnimationTriggerMetadata[] = [
    trigger('fadeInWithDelay', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms 300ms linear', style({ opacity: 1 }))]),
    ]),
  ];

  public static fadeOut: AnimationTriggerMetadata[] = [
    trigger('fadeOut', [transition(':leave', [style({ opacity: 1 }), animate('300ms linear', style({ opacity: 0 }))])]),
  ];

  public static fadeInOutListItems: AnimationTriggerMetadata[] = [
    trigger('fadeInOutListItems', [
      transition('* => *', [
        query(':enter', [style({ opacity: 0 }), stagger('300ms', [animate('300ms', style({ opacity: 1 }))])], {
          optional: true,
        }),
        query(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))], { optional: true }),
      ]),
    ]),
  ];

  public static collapseExpandContainer: AnimationTriggerMetadata[] = [
    trigger('collapseExpandContainer', [
      state('collapsed', style({ height: 'calc((1em + 6px) * 3)' })),
      state('expanded', style({ height: '*' })),
      transition(`collapsed <=> expanded`, animate('200ms')),
    ]),
  ];

  public static collapse: AnimationTriggerMetadata[] = [
    trigger('collapse', [
      transition('* => void', [style({ height: '*' }), animate('300ms ease-in-out', style({ height: '0' }))]),
      transition('void => *', [style({ height: '0' }), animate('300ms ease-in-out', style({ height: '*' }))]),
    ]),
  ];

  public static dropdownAnimation: AnimationTriggerMetadata[] = [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-8px)', opacity: '0' }),
        animate('200ms ease-in', style({ transform: 'translateY(0)', opacity: '1' })),
      ]),
      transition(':leave', [animate('200ms ease-out', style({ transform: 'translateY(8px)', opacity: '0' }))]),
    ]),
  ];
}

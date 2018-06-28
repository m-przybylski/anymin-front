// tslint:disable:readonly-array
import {
  animate, AnimationTriggerMetadata, query, stagger, style, transition,
  trigger
} from '@angular/animations';

export class Animations {

  public static fadeInWithDelay: AnimationTriggerMetadata[] = [
    trigger('fadeInWithDelay', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms 300ms linear', style({opacity: 1}))
      ]),
    ])
  ];

  public static fadeOut: AnimationTriggerMetadata[] = [
    trigger('fadeOut', [
      transition(':leave', [
        style({opacity: 1}),
        animate('300ms linear', style({opacity: 0}))
      ]),
    ])
  ];

  public static fadeInOutListItems: AnimationTriggerMetadata[] = [
    trigger('fadeInOutListItems', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0}),
          stagger('300ms', [
            animate('300ms', style({opacity: 1}))
          ])
        ], {optional: true}),
        query(':leave', [
          style({opacity: 1}),
            animate('300ms', style({opacity: 0}))
        ], {optional: true})
      ])
    ])
  ];

}

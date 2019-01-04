import { Component, Input } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Animations } from '@platform/shared/animations/animations';

@Component({
  selector: 'plat-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.sass'],
  animations: [Animations.dropdownAnimation, Animations.collapse],
})
export class MenuListComponent {
  @Input()
  public dropdownVisibility: 'visible' | 'hidden';

  public onAnimationStart = (event: AnimationEvent, el: HTMLUListElement): void => {
    if (event.fromState === 'void' && event.toState === 'hidden') {
      el.style.visibility = 'hidden';

      return;
    }

    if (event.toState === 'visible') {
      el.style.visibility = 'visible';

      return;
    }
  };

  public onAnimationDone = (event: AnimationEvent, el: HTMLUListElement): void => {
    if (event.toState === 'hidden') {
      el.style.visibility = 'hidden';
    }
  };
}

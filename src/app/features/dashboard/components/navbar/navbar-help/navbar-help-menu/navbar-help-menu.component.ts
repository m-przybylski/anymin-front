import { Component, Input } from '@angular/core';
import { Config } from '../../../../../../../config';
import { Animations } from '@platform/shared/animations/animations';

interface IHelpLink {
  url: string;
  description: string;
}

@Component({
  selector: 'plat-navbar-help-menu',
  templateUrl: './navbar-help-menu.component.html',
  styleUrls: ['./navbar-help-menu.component.sass'],
  animations: [Animations.menuSlideInOut],
})
export class NavbarHelpMenuComponent {
  @Input()
  public set isHelpMenuVisible(value: boolean) {
    this.animationState = value ? 'show' : 'hide';
  }

  public readonly zendeskMailUrl = Config.links.zendesk;
  public readonly zendeskHelpUrls: ReadonlyArray<IHelpLink> = [
    {
      url: 'https://anymind.zendesk.com/hc/pl/articles/115002691532--Jak-doda%C4%87-nowego-konsultanta-',
      description: 'NAVIGATION.HELP_MENU.HOW_ADD_CONSULTANT',
    },
    {
      url: 'https://anymind.zendesk.com/hc/pl/articles/115002693111--Jak-zmieni%C4%87-adres-email-',
      description: 'NAVIGATION.HELP_MENU.HOW_CHANGE_EMAIL',
    },
    {
      url: 'https://anymind.zendesk.com/hc/pl/articles/360002407392--Jak-AnyMind-rozlicza-konsultacje-',
      description: 'NAVIGATION.HELP_MENU.HOW_PAYMENTS',
    },
    {
      url: 'https://anymind.zendesk.com/hc/pl/articles/115002691492--Jak-edytowa%C4%87-moje-konsultacje-',
      description: 'NAVIGATION.HELP_MENU.HOW_EDIT_CONSULTATION',
    },
  ];

  public animationState: 'show' | 'hide' = 'hide';

  public onHelpFooterClick(): void {
    window.open(this.zendeskMailUrl, '_blank');
  }
}

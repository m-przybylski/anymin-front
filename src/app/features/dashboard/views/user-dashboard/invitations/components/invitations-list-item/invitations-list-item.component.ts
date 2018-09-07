import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'plat-invitations-list-item',
  templateUrl: 'invitations-list-item.component.html',
  styleUrls: ['invitations-list-item.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class InvitationsListItemComponent {
  @Input()
  public isVisited: boolean;
  @Input()
  public date: Date;
  @Input()
  public avatarToken: string;
  @Input()
  public ownerName: string;
  @Input()
  public consultationDesc: string;
}

import { Component, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'plat-invitations-list-item',
  templateUrl: 'invitations-list-item.component.html',
  styleUrls: ['invitations-list-item.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class InvitationsListItemComponent {
  @Input()
  public id: string;
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

  @Output()
  public invitatonClicked: EventEmitter<string> = new EventEmitter();

  public onInvitationClicked = (invitationId: string): void => {
    this.invitatonClicked.emit(invitationId);
  };
}

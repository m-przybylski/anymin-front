import { Component, Input, OnDestroy } from '@angular/core';
import { AvatarSizesEnum } from '../../../../user-avatar/user-avatar.component';
import { EditProfileModalComponentService } from '../../edit-profile.component.service';

@Component({
  selector: 'app-avatar-uploader',
  templateUrl: './avatar-uploader.component.html',
  styleUrls: ['./avatar-uploader.component.sass']
})
export class AvatarUploaderComponent implements OnDestroy {

  @Input()
  public avatarUrl: string;
  public readonly avatarSize = AvatarSizesEnum.X_152;

  constructor(private editProfileModalComponentService: EditProfileModalComponentService) {
  }

  public ngOnDestroy(): void {
    this.editProfileModalComponentService.getPreviousAvatarSrc().next(this.avatarUrl);
  }

  public onClickClear = (): void =>
    this.editProfileModalComponentService.getPreviousAvatarSrc().next('')

}

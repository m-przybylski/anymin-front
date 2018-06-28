import { Component, Input, OnDestroy } from '@angular/core';
import { AvatarSizeEnum } from '../../../../user-avatar/user-avatar.component';
import { EditProfileModalComponentService } from '../../edit-profile.component.service';

@Component({
  selector: 'app-avatar-uploader',
  templateUrl: './avatar-uploader.component.html',
  styleUrls: ['./avatar-uploader.component.sass']
})
export class AvatarUploaderComponent implements OnDestroy {

  @Input()
  public avatarUrl: string;
  public isError = false;
  public readonly avatarSize = AvatarSizeEnum.X_152;

  constructor(private editProfileModalComponentService: EditProfileModalComponentService) {}

  public onError = (isError: boolean): void => {
    this.isError = isError;
  }

  public ngOnDestroy(): void {
    this.editProfileModalComponentService.getPreviousAvatarSrc().next(this.avatarUrl);
  }

  public onClickClear = (): void => {
    this.isError = false;
    this.editProfileModalComponentService.getPreviousAvatarSrc().next('');
  }

}

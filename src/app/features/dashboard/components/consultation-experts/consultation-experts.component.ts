import { Component, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { AvatarSizeEnum } from '../../../../shared/components/user-avatar/user-avatar.component';
import { expertsLimitToken } from './consultation-experts';

@Component({
  selector: 'plat-consultation-experts',
  templateUrl: 'consultation-experts.component.html',
  styleUrls: ['consultation-experts.component.sass'],
  providers: [
    {
      provide: expertsLimitToken,
      useValue: 4,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationExpertsComponent {
  @Input()
  public get expertAvatarTokenList(): ReadonlyArray<string> {
    return this._expertAvatarTokenList;
  }
  public set expertAvatarTokenList(expertList: ReadonlyArray<string>) {
    this.expertsExists = expertList.length > 0;
    this.overLimit = expertList.length - this.expertsLimit;
    this._expertAvatarTokenList = expertList.slice(0, this.expertsLimit);
  }
  public readonly avatarSize = AvatarSizeEnum.X_24;
  public overLimit: number;
  public expertsExists: boolean;
  private _expertAvatarTokenList: ReadonlyArray<string> = [];
  constructor(@Inject(expertsLimitToken) private expertsLimit: number) {}
}

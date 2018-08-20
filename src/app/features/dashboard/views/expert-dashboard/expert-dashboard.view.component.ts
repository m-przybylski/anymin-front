import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IExpertDashboardResolverData } from './expert-dashboard-resolver.service';
import { AvatarSizeEnum } from '../../../../shared/components/user-avatar/user-avatar.component';
import { EmploymentWithService } from '@anymind-ng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from '../../../../shared/components/modals/profile/edit-profile/edit-profile.component';
import { Subject } from 'rxjs';
import { takeUntil, pluck } from 'rxjs/operators';
import { CreateExpertConsultationModalComponent } from '../../../../shared/components/modals/create-expert-consultation/create-expert-consultation.component';

@Component({
  selector: 'plat-expert-dashboard',
  templateUrl: './expert-dashboard.view.component.html',
  styleUrls: ['./expert-dashboard.view.component.sass'],
})
export class ExpertDashboardComponent implements OnDestroy {
  public avatarToken: string;
  public name: string;
  public links: ReadonlyArray<string>;
  public description: string;
  public isOwnProfile: boolean;
  public consultations: ReadonlyArray<EmploymentWithService>;
  public expertId: string;
  public readonly avatarSize = AvatarSizeEnum.X_156;
  private readonly destroyed$ = new Subject<void>();
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
    this.route.data
      .pipe(
        takeUntil(this.destroyed$),
        pluck('expert'),
      )
      .subscribe((data: IExpertDashboardResolverData) => {
        this.avatarToken = data.expertProfile.expertProfile.avatar;
        this.name = data.expertProfile.expertProfile.name;
        this.description = data.expertProfile.expertProfile.description;
        this.links = this.getFlattenLinks(data.expertProfile.employments);
        this.isOwnProfile = data.isOwnProfile;
        this.consultations = data.expertProfile.employments;
        this.expertId = data.expertProfile.expertProfile.id;
      });
  }
  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * callback when edit profile is triggered.
   * Modal resolves to true if user changes something.
   */
  public editProfile = async (): Promise<void> => {
    const changed: boolean | undefined = await this.modalService.open(EditProfileModalComponent).result;
    this.realoadIfNeeded(changed);
  };
  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation = async (): Promise<void> => {
    const changed: boolean | undefined = await this.modalService.open(CreateExpertConsultationModalComponent).result;
    this.realoadIfNeeded(changed);
  };

  /**
   * extracts links from all consulations assigned to one expert
   * and creates a list from it. It also removes duplications
   */
  private getFlattenLinks = (employments: ReadonlyArray<EmploymentWithService>): ReadonlyArray<string> => {
    const set = new Set(
      employments
        .map(
          employement =>
            (employement.serviceDetails.ownerProfile.expertDetails &&
              employement.serviceDetails.ownerProfile.expertDetails.links) ||
            [],
        )
        .reduce((acc, cur) => acc.concat(cur), []),
    );

    return Array.from(set);
  };

  private realoadIfNeeded = (reload: boolean | undefined): void => {
    if (typeof reload !== 'undefined' && reload) {
      this.reload();
    }
  };
  private reload = (): void => {
    void this.router.navigate(this.route.snapshot.url.map(url => url.toString()), {
      relativeTo: this.route.parent,
    });
  };
}

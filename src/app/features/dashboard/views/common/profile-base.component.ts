import { Injector, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmploymentWithService } from '@anymind-ng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

export class ProfileBaseComponent implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();
  protected route: ActivatedRoute = this.injector.get(ActivatedRoute);
  private modalService: NgbModal = this.injector.get(NgbModal);
  private router: Router = this.injector.get(Router);
  constructor(private injector: Injector) {}

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  /**
   * helper for opening modal.
   * @param component component to be opened
   * @returns Promise resolves when modal is closed
   */
  protected openModalResult = <T>(component: T): Promise<boolean> => this.modalService.open(component).result;

  /**
   * helper for opening modal.
   * @param component component to be opened
   * @returns modal handler used to pass parameters
   */
  protected openModal = <T>(component: T): NgbModalRef => this.modalService.open(component);

  /**
   * extracts links from all consulations assigned to one expert
   * and creates a list from it. It also removes duplications
   */
  protected getFlattenLinks = (employments: ReadonlyArray<EmploymentWithService>): ReadonlyArray<string> => {
    const set = new Set(
      employments
        .map(
          employment =>
            (employment.serviceDetails.ownerProfile.expertDetails &&
              employment.serviceDetails.ownerProfile.expertDetails.links) ||
            [],
        )
        .reduce((acc, cur) => acc.concat(cur), []),
    );

    return Array.from(set);
  };
  /** helper for reloading page. Reload by navigating to the same route */
  protected realoadIfNeeded = (reload: boolean | undefined): void => {
    if (typeof reload !== 'undefined' && reload) {
      this.reload();
    }
  };
  protected reload = (): void => {
    void this.router.navigate(this.route.snapshot.url.map(url => url.toString()), {
      relativeTo: this.route.parent,
    });
  };
}

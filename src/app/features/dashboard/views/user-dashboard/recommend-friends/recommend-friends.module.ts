import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecommendFriendsViewComponent } from '@platform/features/dashboard/views/user-dashboard/recommend-friends/recommend-friends.view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RecommendFriendsViewComponent,
      },
    ]),
  ],
  exports: [],
  providers: [],
  declarations: [RecommendFriendsViewComponent],
})
export class RecommendFriendsModule {}

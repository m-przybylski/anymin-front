import { NgModule } from '@angular/core';
import { GenerateWidgetComponent } from './components/generate-widget/generate-widget.component';
import { GenerateWidgetService } from './services/generate-widget.service';
import { GenerateWidgetDataService } from './services/generate-widget.data.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducers/generate-widget.reducer';
import { GenerateWidgetEffects } from './effects/generate-widget.effects';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';
import { GenerateWidgetButtonTypeComponent } from './components/generate-widget-button-type/generate-widget-button-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CopyCodeToClipbord } from './components/copy-generated-code/copy-generated-code.component';

@NgModule({
  declarations: [GenerateWidgetComponent, GenerateWidgetButtonTypeComponent, CopyCodeToClipbord],
  imports: [
    CommonModule,
    ModalComponentsModule,
    ButtonModule,
    IconModule,
    StepperModule,
    UserAvatarModule,
    ReactiveFormsModule,
    StoreModule.forFeature('generateWidget', reducer),
    EffectsModule.forFeature([GenerateWidgetEffects]),
    TranslateModule.forChild(),
    ExpertAvailabilityModule,
  ],
  providers: [GenerateWidgetService, GenerateWidgetDataService],
  entryComponents: [GenerateWidgetComponent],
})
export class GenerateWidgetModule {}

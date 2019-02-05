import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Config } from '../config';
import { TranslateModule } from '@ngx-translate/core';
import { COMPONENTS_CONFIG, CORE_CONFIG } from '../shared/injection-tokens/injection-tokens';
import { CoreConfig } from '../core-config';

@NgModule({
  imports: [TranslateModule.forChild(), BrowserAnimationsModule],
  declarations: [],
  exports: [TranslateModule, BrowserAnimationsModule],
  providers: [],
})
export class AnymindComponentsCoreModule {
  /**
   * Use in AppModule: new instance of SumService.
   */
  public static forRoot(coreConfig: () => CoreConfig): ModuleWithProviders {
    return {
      ngModule: AnymindComponentsCoreModule,
      providers: [{ provide: COMPONENTS_CONFIG, useClass: Config }, { provide: CORE_CONFIG, useFactory: coreConfig }],
    };
  }
}

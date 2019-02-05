import { NgModule, ModuleWithProviders } from '@angular/core';
import { UserConfig } from 'machoke-sdk';
import { COMMUNICATOR_CONFIG } from '../shared/injection-tokens/injection-tokens';

@NgModule({})
// Consider registering providers using a forRoot() method
// when the module exports components, directives or pipes that require sharing the same providers instances.
// Consider registering providers also using a forChild() method
// when they requires new providers instances or different providers in child modules.
export class CommunicatorModule {
  /**
   * Use in AppModule: new instance of SumService.
   */
  public static forRoot(config: () => UserConfig): ModuleWithProviders {
    return {
      ngModule: CommunicatorModule,
      providers: [
        {
          provide: COMMUNICATOR_CONFIG,
          useFactory: config,
        },
      ],
    };
  }
}
